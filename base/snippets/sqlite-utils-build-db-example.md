---
title: Building an sqlite database using sqlite-utils - example
date: 2025-06-20
tags: [sqlite]
---
# Building an sqlite database using sqlite-utils - example

Here is how it can be done, in a `build-db.sh` file:

```shell
sqlite-utils insert data.db books ./data/popular-history-books.tsv --tsv --pk isbn_10
sqlite-utils insert data.db books_tags ./data/books-tags.csv --csv
sqlite-utils insert data.db quotes ./data/quotes.tsv --tsv
sqlite-utils insert data.db tags ./data/tags.csv --csv --pk pk_tag_id
sqlite-utils insert data.db cats ./data/cats.csv --csv --pk pk_cat_id
sqlite-utils transform ./data.db tags --type tag_sort INTEGER
sqlite-utils transform ./data.db cats --type cat_sort INTEGER
sqlite-utils transform ./data.db books --type pages INTEGER
sqlite-utils convert ./data.db books hb_publish_date 'r.parsedate(value, dayfirst=True)'
sqlite-utils enable-fts ./data.db books title author publisher --fts4 --tokenize porter
```

A github action might then look like this (noting the `requirements.txt` file contains only the line `sqlite-utils` but you _need_ the `requirements.txt` file otherwise python doesn't setup properly - ie you can't just pip install sqlite-utils directly in the action):

```yaml
name: Build and commit sqlite db

on:
  workflow_dispatch:

jobs:
  build-and-deploy-test:
    runs-on: ubuntu-latest

    permissions:
      contents: write 
    
    steps:
    - uses: actions/checkout@v4
    - name: Set up Python 3.10
      uses: actions/setup-python@v5
      with:
        python-version: "3.10"
        cache: "pip"
    - name: Install dependencies
      run: |
        pip install -r requirements.txt
    - name: Build SQLite database
      run: |
        bash ./build-db.sh
    - name: Commit and push
      run: |-
        git config user.name "Automated"
        git config user.email "actions@users.noreply.github.com"
        git add 'data.db'
        timestamp=$(date -u)
        git commit -m "${timestamp}" || exit 0
        git pull --rebase
        git push
```
