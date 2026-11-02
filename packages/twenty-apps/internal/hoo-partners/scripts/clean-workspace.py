#!/usr/bin/env python3
"""Turn off the Twenty features Hoo doesn't use and order the sidebar.

Usage: clean-workspace.py [--url URL] [--dry-run] [--prune]

Safe to run again: it only changes what differs. Run it after the
hoo-partners app is synced, so the Partner and Treatment menu items exist.

--dry-run  print the changes, write nothing
--prune    also delete workspace menu items that aren't in MENU
           (folders, links, views someone added); kept by default

Uses the API key in ~/.twenty/config.json under remotes.hoo, or
TWENTY_API_KEY when set.
"""

import argparse
import json
import os
import urllib.error
import urllib.request
from pathlib import Path

CONFIG = Path.home() / ".twenty" / "config.json"

# Workspace settings, all off. Password sign-in stays on.
WORKSPACE = {
    "isPublicInviteLinkEnabled": False,
    "isGoogleAuthEnabled": False,
    "isMicrosoftAuthEnabled": False,
    "isInternalMessagesImportEnabled": False,
    "isCampaignClickTrackingEnabled": False,
    "isCampaignOpenTrackingEnabled": False,
}

# Sidebar order, by object nameSingular.
MENU = [
    "partner",
    "treatment",
    "person",
    "company",
    "opportunity",
    "task",
    "note",
    "dashboard",
    "workflow",
]

API = ""
KEY = ""


def api_key():
    if os.environ.get("TWENTY_API_KEY"):
        return os.environ["TWENTY_API_KEY"]
    if not CONFIG.is_file():
        raise SystemExit(f"missing Twenty config at {CONFIG}")
    config = json.loads(CONFIG.read_text())
    try:
        return config["remotes"]["hoo"]["apiKey"]
    except KeyError as error:
        raise SystemExit(
            "missing remotes.hoo.apiKey in ~/.twenty/config.json"
        ) from error


def graphql(query, variables=None):
    request_obj = urllib.request.Request(
        API + "/metadata",
        data=json.dumps({"query": query, "variables": variables or {}}).encode(),
        headers={
            "Authorization": f"Bearer {KEY}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(request_obj, timeout=60) as response:
            payload = json.loads(response.read())
    except urllib.error.HTTPError as error:
        raise SystemExit(f"POST /metadata -> {error.code}\n{error.read().decode()}") from error
    except urllib.error.URLError as error:
        raise SystemExit(f"cannot reach {API}: {error.reason}") from error
    if payload.get("errors"):
        raise SystemExit(json.dumps(payload["errors"], indent=2))
    return payload["data"]


def clean_workspace(dry_run):
    fields = " ".join(WORKSPACE)
    current = graphql(f"{{ currentWorkspace {{ {fields} }} }}")["currentWorkspace"]
    changes = {k: v for k, v in WORKSPACE.items() if current.get(k) != v}
    for name, value in changes.items():
        print(f"workspace {name}: {current.get(name)} -> {value}")
    if changes and not dry_run:
        graphql(
            "mutation($data: UpdateWorkspaceInput!) { updateWorkspace(data: $data) { id } }",
            {"data": changes},
        )
    return len(changes)


def clean_menu(dry_run, prune):
    objects = graphql(
        "{ objects(paging: {first: 500}) { edges { node { id nameSingular } } } }"
    )["objects"]["edges"]
    name_of = {e["node"]["id"]: e["node"]["nameSingular"] for e in objects}
    items = graphql(
        "{ navigationMenuItems { id type position name folderId"
        " userWorkspaceId targetObjectMetadataId } }"
    )["navigationMenuItems"]
    # Top-level workspace items only; personal favorites belong to each user.
    items = [i for i in items if not i["userWorkspaceId"] and not i["folderId"]]

    by_object = {}
    extras = []
    for item in items:
        name = name_of.get(item["targetObjectMetadataId"] or "")
        if item["type"] == "OBJECT" and name in MENU and name not in by_object:
            by_object[name] = item
        else:
            extras.append(item)

    changes = 0
    for name in MENU:
        if name not in by_object:
            print(f"menu: no item for {name}, add it in the app if you want it")
    wanted = [by_object[n] for n in MENU if n in by_object]
    for position, item in enumerate(wanted):
        if item["position"] != position:
            name = name_of[item["targetObjectMetadataId"]]
            print(f"menu {name}: position {item['position']} -> {position}")
            changes += 1
            if not dry_run:
                graphql(
                    "mutation($input: UpdateOneNavigationMenuItemInput!) {"
                    " updateNavigationMenuItem(input: $input) { id } }",
                    {"input": {"id": item["id"], "update": {"position": position}}},
                )

    for offset, item in enumerate(extras):
        label = item["name"] or name_of.get(item["targetObjectMetadataId"] or "", item["type"])
        if prune:
            print(f"menu {label}: delete")
            changes += 1
            if not dry_run:
                graphql(
                    "mutation($id: UUID!) { deleteNavigationMenuItem(id: $id) { id } }",
                    {"id": item["id"]},
                )
        else:
            position = len(wanted) + offset
            print(f"menu {label}: not in MENU, kept (use --prune to delete)")
            if item["position"] < len(wanted):
                print(f"menu {label}: position {item['position']} -> {position}")
                changes += 1
                if not dry_run:
                    graphql(
                        "mutation($input: UpdateOneNavigationMenuItemInput!) {"
                        " updateNavigationMenuItem(input: $input) { id } }",
                        {"input": {"id": item["id"], "update": {"position": position}}},
                    )
    return changes


def main():
    global API, KEY
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--url", default="http://localhost:3000")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--prune", action="store_true")
    args = parser.parse_args()
    API = args.url.rstrip("/")
    KEY = api_key()

    changes = clean_workspace(args.dry_run) + clean_menu(args.dry_run, args.prune)
    if not changes:
        print("nothing to change")
    elif args.dry_run:
        print(f"{changes} changes (dry run, nothing written)")
    else:
        print(f"{changes} changes")


if __name__ == "__main__":
    main()
