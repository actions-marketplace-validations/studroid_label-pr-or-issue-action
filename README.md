# Label PR or Issue GitHub Action

**Name:** `studroid/label-pr-or-issue-action`

Add a label to a PR or an issue by its number.

## Usage instructions

```yaml
name: Label a Pull Request or an Issue
on: pull_request_target

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
    steps:
      - uses: studroid/label-pr-or-issue-action@v1
        with:
          label: "my-label"
```

```yaml
name: Label a Pull Request or an Issue

on:
  workflow_dispatch:
    inputs: 
      prOrIssueNumber:
        description: Pull request or issue number to label
        required: true

jobs:
  auto-approve:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
    steps:
    - uses: studroid/label-pr-or-issue-action@v1
      with:
        pr-or-issue-number: ${{ github.event.inputs.prOrIssueNumber }}
        label: "my-label"
```

### Labeling on behalf of a different user

By default, this will use the [automatic GitHub token](https://docs.github.com/en/actions/security-guides/automatic-token-authentication) that's provided to the workflow. This means the approval will come from the "github-actions" bot user. Make sure you enable the `pull-requests: write` permission in your workflow.

To approve the pull request as a different user, pass a GitHub Personal Access Token into the `github-token` input. In order to approve the pull request, the token needs the `repo` scope enabled.

```yaml
name: Label a Pull Request or an Issue

on: pull_request_target

jobs:
  auto-approve:
    runs-on: ubuntu-latest
    steps:
      - uses: studroid/label-pr-or-issue-action@v1
        with:
          github-token: ${{ secrets.SOME_USERS_PAT }}
          pr-or-issue-number: ${{ github.event.inputs.prOrIssueNumber }}
          label: "my-label"
```

## Development and release process

Each major version corresponds to a branch (e.g. `v2`, `v3`). The latest major version (`v1` at the time of writing) is the repository's default branch. Releases are tagged with semver-style version numbers (e.g. `v1.2.3`).
