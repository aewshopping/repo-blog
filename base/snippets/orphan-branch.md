---
title: Creating an empty branch with GitHub Actions
date: 2025-06-29
tags: [github-actions, git]
---
# Creating an empty branch with GitHub Actions

Also known as an orphan branch. 

The idea is that if you are just serving files from the branch you don't care about this history.

If the file is a binary (eg sqlite database) this history can get very bloated and so much better not too commit the file to the main branch.

The code below will delete the branch if it exists before creating afresh.

```yaml
name: Recreate Orphan Data Output Branch

on:
  workflow_dispatch:
  
jobs:
  recreate_orphan_branch:
    runs-on: ubuntu-latest
    permissions:
      contents: write 

    steps:
      - name: Checkout main branch (needed for basic repo access)
        uses: actions/checkout@v4
        with:
          ref: main 
          fetch-depth: 1 # Only fetch the latest commit, minimal download

      - name: Configure Git User
        run: |
          git config user.name "Automated"
          git config user.email "actions@users.noreply.github.com"

      - name: Delete existing data-output branch (local and remote)
        run: |
          echo "Attempting to delete 'data-output' branch if it exists..."

          # Delete remote branch if it exists
          if git ls-remote --exit-code --heads origin data-output; then
            echo "Remote 'data-output' branch found. Deleting..."
            git push origin --delete data-output
            echo "Remote 'data-output' branch deleted."
          else
            echo "Remote 'data-output' branch does not exist."
          fi

          # Delete local branch if it exists (e.g., from a previous checkout)
          # We check if it exists locally before attempting to delete
          if git branch --list data-output | grep -q data-output; then
             echo "Local 'data-output' branch found. Deleting..."
             git branch -D data-output # Force delete local branch
             echo "Local 'data-output' branch deleted."
          else
             echo "Local 'data-output' branch does not exist."
          fi
        shell: bash

      - name: Create new Orphan Data Output Branch
        run: |
          echo "Creating new orphan 'data-output' branch..."

          # Create an orphan branch named 'data-output'
          # This command clears the working directory and staging area and puts you on a new branch with no history.
          git checkout --orphan data-output

          # Remove all files from the working directory (they are from the 'main' checkout)
          # This ensures the new branch starts truly empty of inherited files
          git rm -rf .

          # Create an initial empty commit
          # This is necessary because Git needs at least one commit on a branch
          # before you can push it or switch away from it.
          git commit --allow-empty -m "Initial (recreated) commit for data-output branch (orphan)"

          echo "New orphan 'data-output' branch created locally."
        shell: bash

      - name: Push new Orphan Branch to remote
        run: |
          git push --set-upstream origin data-output
          echo "New orphan 'data-output' branch pushed to remote."
        shell: bash
```
