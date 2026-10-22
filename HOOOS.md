# HooOS

HooOS is Conform's fork of [Twenty](https://github.com/twentyhq/twenty). We keep our own changes here and pull in Twenty's releases as they come out. Twenty's own docs (`README.md`, `CLAUDE.md`) still apply to everything that isn't ours.

```
twentyhq/twenty ──(sync PR, on demand)──▶ ConformLLC/HooOS main ──git pull──▶ each dev's machine
                                          ▲
                     feature branch ──PR──┘
```

## Rule one: change Twenty's code as little as possible

Every line we edit in Twenty's files can conflict with every future release. In order of preference:

1. **Configuration, no code**: custom objects and fields, views, workflows, roles, settings, env vars. These live in the database or `.env`, so they never conflict.
2. **From outside, over the API**: the RX generator and other integrations call Twenty's REST/GraphQL API and webhooks from their own repos (for example `hoo-rx`).
3. **New files in our own places**: put HooOS code in new files and folders, and keep hooks into Twenty's files to a line or two.
4. **Editing Twenty's files**: only when nothing above works. Add the file to [Changes to Twenty's code](#changes-to-twentys-code) in the same PR.

Name anything of ours with `hooos` (for example `hooos-*.yaml` workflows, `hooos/` folders) so it never collides with a file Twenty adds.

## Setup (once per machine)

```sh
git clone https://github.com/ConformLLC/HooOS.git
cd HooOS
git remote add upstream https://github.com/twentyhq/twenty.git
git remote set-url --push upstream DISABLED-do-not-push-to-twenty   # pushes only ever go to our fork
bash packages/twenty-utils/setup-dev-env.sh                          # Postgres/Redis + database
yarn start                                                           # front + server + worker
```

`upstream` is only needed to sync or compare by hand; day to day everything comes from `origin`.

## Making a change

1. **Start from fresh main**
   ```sh
   git checkout main && git pull
   git checkout -b hooos/<short-name>
   ```
2. **Make the change** (see rule one). If it edits a Twenty file, add a line to [Changes to Twenty's code](#changes-to-twentys-code).
3. **Check it locally** with the commands in `CLAUDE.md`, for example `npx nx lint:diff-with-main twenty-server`, `npx nx test twenty-front`, then use it in the running app.
4. **Push and open a PR into `main` of ConformLLC/HooOS.** Not into twentyhq/twenty: when GitHub offers to open the PR against Twenty, change the base repository to `ConformLLC/HooOS`.
   ```sh
   git push -u origin hooos/<short-name>
   gh pr create --repo ConformLLC/HooOS --base main
   ```
5. **The other dev reviews it.** Fix anything raised, then merge.
6. **Both pull**: `git checkout main && git pull`. Rebuild shared code if it changed: `npx nx build twenty-shared --skip-nx-cache`.

## Syncing with Twenty

The `HooOS Sync Twenty` workflow (`.github/workflows/hooos-sync-twenty.yaml`) runs only when one of us starts it: Actions → HooOS Sync Twenty → Run workflow, or `gh workflow run hooos-sync-twenty.yaml -R ConformLLC/HooOS`. If Twenty has published a release that `main` doesn't include yet, it opens a PR **Sync with Twenty twenty/vX.Y.0**. Leave the tag box empty for the latest release, or enter one such as `twenty/v2.51.0`.

It only takes feature releases (`twenty/vX.Y.0`). Those are tagged on Twenty's main. Patch releases (`twenty/vX.Y.1`) are cherry-picks on side branches and would conflict, and their fixes arrive with the next feature release anyway.

To handle a sync PR:

1. **Read Twenty's release notes** (linked in the PR) for breaking changes and upgrade steps.
2. **Resolve conflicts.** If GitHub can't resolve them in the browser, do it locally:
   ```sh
   git fetch origin
   git checkout -b sync-fix origin/main
   git merge origin/sync/twenty-vX.Y.0
   # fix conflicts; for files in "Changes to Twenty's code", keep their change and re-apply ours
   git commit
   git push origin sync-fix:sync/twenty-vX.Y.0
   ```
3. **Run it locally**: `yarn`, `npx nx build twenty-shared --skip-nx-cache`, then migrations and upgrade commands:
   ```sh
   npx nx database:migrate twenty-server
   npx nx command twenty-server -- upgrade
   ```
   Then `yarn start` and click through the main screens and any HooOS features.
4. **Merge with "Create a merge commit"**, never squash or rebase. Squashing loses the link to Twenty's history and the next sync conflicts on everything.
5. **Tell the other dev.** They pull and run step 3 on their machine.

Syncing by hand does the same thing as the workflow:
```sh
git fetch upstream --tags
git checkout -b sync/twenty-vX.Y.0 origin/main
git merge twenty/vX.Y.0
git push -u origin sync/twenty-vX.Y.0   # then open the PR into main
```

### The sync token

GitHub's built-in Actions token can't push changes to `.github/workflows`, and every Twenty release has some. So the workflow uses a token stored as the repo secret **`HOOOS_SYNC_TOKEN`**: a fine-grained personal access token limited to ConformLLC/HooOS with **Contents**, **Pull requests** and **Workflows** set to read and write. When it expires, the workflow fails; make a new one and replace the secret.

## Twenty's workflows in this repo

The fork carries Twenty's own CI and deploy workflows. Some can't work here (deploys, translation syncs, and jobs that need Twenty's secrets or 4/8-core runners), so they're **disabled in the repo's Actions settings**, not edited, which keeps the files identical to Twenty's and avoids sync conflicts. A new workflow from a Twenty release starts out enabled; disable it in Actions if it doesn't belong here.

## Changes to Twenty's code

Every Twenty file we've modified, so sync conflicts are quick to place. Add a row in the same PR as the change.

| File | What we changed | Why |
|---|---|---|
| _none yet_ | | |

## License

Twenty is AGPLv3, with some files under Twenty's commercial license (marked `/* @license Enterprise */`) and some packages under MIT; see `LICENSE`. Because people use HooOS over the network, our modified source must stay available to them; this public repo covers that. Don't ship the enterprise-licensed parts without a license from Twenty, and keep Twenty's name and logo out of HooOS branding.
