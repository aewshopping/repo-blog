---
title: Committing to a different branch
date: 2025-06-29
tags: [github-actions, git]
---
# Committing to a different branch

For example to `data-output` branch...

Requires this branch to already exist otherwise will fail. 

Basic idea of that you create the file on main, then checkout the alternative branch, then copy it across to that branch.

At the point commit to the alternative branch.

```yaml
name: data-output branch - build and commit sqlite db # THIS ACTION REQUIRES BRANCH DATA-OUTPUT TO EXISTING ALREADY

on:
  workflow_dispatch:

jobs:
  build-and-deploy-test:
    runs-on: ubuntu-latest

    permissions:
      contents: write 
    
    steps:
    - name: Checkout main branch
      uses: actions/checkout@v4
      with:
        ref: main
        path: main-branch

    - name: Set up Python 3.10
      uses: actions/setup-python@v5
      with:
        python-version: "3.10"
        cache: "pip"
        
    - name: Install dependencies
      run: |
        pip install -r main-branch/requirements.txt
        
    - name: Build SQLite database
      run: |
        cd main-branch
        rm -f data.db
        bash ./build-db.sh

    - name: Checkout data output branch
      uses: actions/checkout@v4
      with:
        ref: data-output
        path: data-output-branch

    - name: Delete old SQlite database
      run: |
        cd data-output-branch
        rm -f data.db
        cp ../main-branch/data.db . # Copy to current directory (data-output-branch)
        
    - name: Commit and push
      run: |-
        cd data-output-branch
        git config user.name "Automated"
        git config user.email "actions@users.noreply.github.com"
        git add data.db
        timestamp=$(date -u)
        git commit -m "${timestamp}" || exit 0
        git pull --rebase origin data-output
        git push origin HEAD:data-output
```
