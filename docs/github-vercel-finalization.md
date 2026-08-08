# GitHub and Vercel Finalization

The website repository is ready locally and has an initial commit with CI/CD workflows.

## Current Local State

```text
branch: main
commit: a385ab6 Set up MyCalAgent website CI/CD
remote: https://github.com/Krahul12345/MyCalAgent-AI-Powered-Calories-tracking.git
```

## Push Blocker

The local GitHub CLI login is `Rahulkisho`, which has classic `repo` and `workflow` scopes, but does not have write access to the target repository.

The `GITHUB_TOKEN` stored in the local `.env` authenticates as `Krahul12345` and reports admin/push permissions for the target repository through the GitHub API, but Git push is rejected when the commit includes `.github/workflows`. That token appears to be a fine-grained token without the required workflow permission for creating or updating GitHub Actions workflow files.

## Required Fix

Use one of these paths:

1. Log in locally as `Krahul12345` with a token that can write repository contents and workflows:

```bash
gh auth login
git push -u origin main
```

2. Create a new fine-grained token for `Krahul12345` with access to `Krahul12345/MyCalAgent-AI-Powered-Calories-tracking` and these permissions:

```text
Contents: Read and write
Workflows: Read and write
Actions secrets/variables: Read and write
Metadata: Read-only
```

Then push:

```bash
git push -u origin main
```

3. Add `Rahulkisho` as an admin or maintainer collaborator on the repository, then push using the already authenticated GitHub CLI account:

```bash
git push -u origin main
```

## Production Deployment Secrets

After the workflow commit is pushed, add these GitHub secrets:

```text
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

Runtime app secrets belong in the Vercel project environment, not in GitHub Actions.
