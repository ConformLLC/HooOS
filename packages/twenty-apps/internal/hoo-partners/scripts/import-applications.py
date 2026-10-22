#!/usr/bin/env python3
"""Load an applications CSV into the local Hoo workspace.

Usage: import-applications.py <applications.csv>

Reads the CSV. Does not store applicant rows in the repo.
Uses the API key in ~/.twenty/config.json under remotes.hoo.
"""

import csv
import json
import re
import sys
import unicodedata
import urllib.error
import urllib.request
from pathlib import Path

API = "http://localhost:3000"
LOGO_FIELD_ID = "5b835dcf-191e-4c22-8a23-3a1505a18ee7"
CONFIG = Path.home() / ".twenty" / "config.json"

PRODUCTS = {
    "weight programs": "WEIGHT",
    "nad+": "NAD",
    "sermorelin": "SERMORELIN",
    "glutathione": "GLUTATHIONE",
    "hormone and menopause": "HORMONE",
    "ghk-cu skin": "GHK_CU",
    "hair programs": "HAIR",
    "sexual wellness": "SEXUAL_WELLNESS",
    "not sure yet (advise me)": "NOT_SURE",
}


def api_key():
    if not CONFIG.is_file():
        raise SystemExit(f"missing Twenty config at {CONFIG}")
    config = json.loads(CONFIG.read_text())
    try:
        return config["remotes"]["hoo"]["apiKey"]
    except KeyError as error:
        raise SystemExit(
            "missing remotes.hoo.apiKey in ~/.twenty/config.json"
        ) from error


KEY = ""


def request(method, path, body=None, data=None, headers=None):
    req_headers = {"Authorization": f"Bearer {KEY}"}
    if headers:
        req_headers.update(headers)
    payload = None
    if body is not None:
        payload = json.dumps(body).encode()
        req_headers["Content-Type"] = "application/json"
    elif data is not None:
        payload = data
    request_obj = urllib.request.Request(
        API + path, data=payload, headers=req_headers, method=method
    )
    try:
        with urllib.request.urlopen(request_obj, timeout=60) as response:
            raw = response.read()
            return response.status, json.loads(raw) if raw else None
    except urllib.error.HTTPError as error:
        detail = error.read().decode()
        raise SystemExit(f"{method} {path} -> {error.code}\n{detail}") from error


def graphql(query, variables):
    status, payload = request(
        "POST",
        "/metadata",
        {"query": query, "variables": variables},
    )
    if payload.get("errors"):
        raise SystemExit(json.dumps(payload["errors"], indent=2))
    return payload["data"]


def slugify(name):
    ascii_name = (
        unicodedata.normalize("NFKD", name)
        .encode("ascii", "ignore")
        .decode()
        .replace("'", "")
    )
    slug = re.sub(r"[^a-z0-9]+", "-", ascii_name.lower()).strip("-")
    return slug[:60]


def split_name(full_name):
    parts = full_name.strip().split()
    if not parts:
        return "Unknown", ""
    if len(parts) == 1:
        return parts[0], ""
    return parts[0], " ".join(parts[1:])


def phone_digits(value):
    digits = re.sub(r"\D", "", value or "")
    if len(digits) == 11 and digits.startswith("1"):
        digits = digits[1:]
    return digits if len(digits) == 10 else ""


def products_of(value):
    found = []
    for part in (value or "").split(","):
        key = part.strip().lower()
        if not key:
            continue
        code = PRODUCTS.get(key)
        if code and code not in found:
            found.append(code)
        elif key:
            print(f"  skipped unknown product {part.strip()!r}")
    return found


def path_of(value):
    text = (value or "").strip()
    if text.startswith("A"):
        return "A"
    if text.startswith("C"):
        return "C"
    return None


def branding_of(value):
    text = (value or "").strip()
    if text == "Options sent to Chethan":
        return "OPTIONS_SENT"
    if text == "Approved":
        return "APPROVED"
    return None


def stage_of(value):
    return "BUILDING" if (value or "").strip() == "Building" else "APPLIED"


def clean(value):
    text = (value or "").strip()
    return text or None


def load_rows(csv_path):
    with csv_path.open(newline="", encoding="utf-8-sig") as handle:
        return list(csv.DictReader(handle))


def placeholder_contact(value):
    text = (value or "").strip().lower()
    return text in {"", "nn", "nan", "n/a", "none"}


def merge_group(rows):
    primary = next(
        (
            row
            for row in rows
            if not placeholder_contact(row.get("Contact name"))
        ),
        rows[0],
    )
    logo_row = next(
        (row for row in rows if clean(row["Logo file URL"])), rows[-1]
    )
    notes = []
    for row in rows:
        note = (row["Notes"] or "").strip()
        if note and note not in notes:
            notes.append(note)
    products = []
    for row in rows:
        for code in products_of(row["Products"]):
            if code not in products:
                products.append(code)
    instagram = next(
        (
            clean(row["Instagram"])
            for row in rows
            if clean(row["Instagram"])
            and clean(row["Instagram"]).lower() not in {"n/a", "no", "none"}
        ),
        None,
    )
    name = clean(primary["Business or personal name"])
    if name is None:
        raise SystemExit("a row is missing a business name")
    if "socal" in name.lower() and "clinic" in name.lower():
        name = "SoCal Men's Clinic"
    note_text = "\n\n".join(notes)
    city = clean(primary["City and state"])
    if city and city not in note_text:
        note_text = f"{note_text}\n\nCity: {city}".strip() if note_text else f"City: {city}"
    if instagram and instagram not in note_text:
        note_text = (
            f"{note_text}\n\nInstagram: {instagram}".strip()
            if note_text
            else f"Instagram: {instagram}"
        )
    if not note_text:
        applied = clean(primary["Date applied"])
        note_text = f"Applied {applied}." if applied else None
    return {
        "name": name,
        "contact": clean(primary["Contact name"]) or "Unknown",
        "email": email_of(primary),
        "phone": next(
            (phone_digits(row["Mobile"]) for row in rows if phone_digits(row["Mobile"])),
            "",
        ),
        "path": path_of(primary["Path"]),
        "branding": branding_of(
            next(
                (clean(row["Branding (Path C)"]) for row in rows if clean(row["Branding (Path C)"])),
                None,
            )
        ),
        "stage": "BUILDING"
        if any(stage_of(row["Status"]) == "BUILDING" for row in rows)
        else "APPLIED",
        "website": clean(logo_row["Website URL"]) or clean(primary["Website URL"]),
        "colors": clean(logo_row["Brand colors"]),
        "logo_url": clean(logo_row["Logo file URL"]),
        "products": products,
        "notes": note_text,
        "submission_id": next(
            (clean(row["Submission ID"]) for row in rows if clean(row["Submission ID"])),
            None,
        ),
    }


def email_of(row):
    email = clean(row.get("Email"))
    if email is None:
        raise SystemExit("a row is missing an email")
    return email.lower()


def partners_from(rows):
    grouped = {}
    order = []
    for row in rows:
        email = clean(row.get("Email"))
        if email is None:
            print("  skipped row with no email")
            continue
        email = email.lower()
        if email not in grouped:
            grouped[email] = []
            order.append(email)
        grouped[email].append(row)
    return [merge_group(grouped[email]) for email in order]


def records(payload):
    data = payload.get("data", payload)
    if isinstance(data, list):
        return data
    if isinstance(data, dict):
        for value in data.values():
            if isinstance(value, list):
                return value
    return []


def existing_people():
    _, payload = request("GET", "/rest/people?limit=200")
    by_email = {}
    for person in records(payload):
        email = ((person.get("emails") or {}).get("primaryEmail") or "").lower()
        if email:
            by_email[email] = person["id"]
    return by_email


def existing_partners():
    _, payload = request("GET", "/rest/partners?limit=200")
    return records(payload)


def create_person(partner, people):
    if partner["email"] in people:
        return people[partner["email"]]
    first, last = split_name(partner["contact"])
    body = {
        "name": {"firstName": first, "lastName": last},
        "emails": {"primaryEmail": partner["email"]},
    }
    if partner["phone"]:
        body["phones"] = {
            "primaryPhoneNumber": partner["phone"],
            "primaryPhoneCountryCode": "US",
            "primaryPhoneCallingCode": "+1",
        }
    _, payload = request("POST", "/rest/people", body)
    person_id = payload["data"]["createPerson"]["id"]
    people[partner["email"]] = person_id
    return person_id


def attach_logo(partner_id, url):
    filename = url.rsplit("/", 1)[-1].split("?")[0] or "logo"
    try:
        with urllib.request.urlopen(url, timeout=30) as response:
            content = response.read()
            content_type = response.headers.get("Content-Type", "image/png")
    except Exception as error:
        print(f"  logo download failed: {error}")
        return
    created = graphql(
        """
        mutation ($filename: String!, $size: Float!, $field: String!) {
          createFileUpload(
            filename: $filename
            size: $size
            fileFolder: FilesField
            fieldMetadataUniversalIdentifier: $field
          ) { fileId uploadUrl contentType }
        }
        """,
        {
            "filename": filename,
            "size": len(content),
            "field": LOGO_FIELD_ID,
        },
    )["createFileUpload"]
    upload = urllib.request.Request(
        created["uploadUrl"],
        data=content,
        headers={"Content-Type": created.get("contentType") or content_type},
        method="PUT",
    )
    with urllib.request.urlopen(upload, timeout=60):
        pass
    graphql(
        """
        mutation ($fileId: String!) {
          completeFileUpload(fileId: $fileId) { id }
        }
        """,
        {"fileId": created["fileId"]},
    )
    request(
        "PATCH",
        f"/rest/partners/{partner_id}",
            {
                "logo": [
                    {
                        "fileId": created["fileId"],
                        "label": filename,
                    }
                ]
            },
    )


def main():
    global KEY
    if len(sys.argv) != 2:
        raise SystemExit("usage: import-applications.py <applications.csv>")
    csv_path = Path(sys.argv[1])
    if not csv_path.is_file():
        raise SystemExit(f"csv not found: {csv_path}")
    KEY = api_key()
    planned = partners_from(load_rows(csv_path))
    people = existing_people()
    already = existing_partners()
    taken_slugs = {item.get("slug") for item in already if item.get("slug")}
    created = 0
    for partner in planned:
        existing = next(
            (
                item
                for item in already
                if partner["submission_id"]
                and item.get("submissionId") == partner["submission_id"]
            ),
            None,
        )
        if existing:
            if partner["logo_url"] and not existing.get("logo"):
                print(f"logo {partner['name']}")
                attach_logo(existing["id"], partner["logo_url"])
            else:
                print(f"skip {partner['name']}")
            continue
        slug = slugify(partner["name"])
        base = slug
        suffix = 2
        while slug in taken_slugs:
            slug = f"{base}-{suffix}"
            suffix += 1
        taken_slugs.add(slug)
        person_id = create_person(partner, people)
        body = {
            "name": partner["name"],
            "slug": slug,
            "stage": partner["stage"],
            "contactId": person_id,
            "requestedProducts": partner["products"] or None,
            "notes": partner["notes"],
            "submissionId": partner["submission_id"],
            "websiteUrl": partner["website"],
            "brandColors": partner["colors"],
        }
        if partner["path"]:
            body["path"] = partner["path"]
        if partner["branding"]:
            body["branding"] = partner["branding"]
        _, payload = request("POST", "/rest/partners", body)
        partner_id = payload["data"]["createPartner"]["id"]
        created += 1
        print(f"added {partner['name']} ({partner['stage']}, {slug})")
        if partner["logo_url"]:
            attach_logo(partner_id, partner["logo_url"])
    print(f"{created} partners")


if __name__ == "__main__":
    main()
