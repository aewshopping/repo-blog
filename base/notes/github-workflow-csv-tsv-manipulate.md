---
title: Github actions to download multiple files from remote urls, and delete columns
date: 2025-06-15
tags: github-actions
---
# Github actions to download multiple files from remote urls, and delete columns

The purpose of this is to create a github action which will get some csv or tsv files from elsewhere, manipluate them a bit (in this case using Miller and deleting columns I don't want), and save them to the repo.

## Folder structure

Create a new directory and file within your repository with this structure:

```
your-repo/
├── .github/
│   └── workflows/
│      └── process-multiple-remote-files.yml  <-- Your main workflow
└── config.json                               <-- Your configuration file
```

## Config file

The `config.json` file will look like this, and lists the files to download, output filename (and directory), plus the format of the file. Suspect the directory will need to exist before the action is run:

```json
[
  {
    "url": "https://raw.githubusercontent.com/datasets/population/main/data/population.csv",
    "output_filename": "data/processed_population.csv",
    "columns_to_delete": ["Year", "Value"],
    "miller_format": "--csv"
  },
  {
    "url": "https://raw.githubusercontent.com/datasets/gdp/main/data/gdp.tsv",
    "output_filename": "data/processed_gdp.tsv",
    "columns_to_delete": ["Country Code"],
    "miller_format": "--tsv"
  },
  {
    "url": "https://raw.githubusercontent.com/datasets/co2-emissions/main/data/co2-emissions.csv",
    "output_filename": "data/processed_co2_emissions.csv",
    "columns_to_delete": ["Unit"],
    "miller_format": "--csv"
  }
]
```

## Workflow file

Note that I changed `curl --output "$TEMP_INPUT_FILE" "$URL"` to `curl -L "$URL" > "$TEMP_INPUT_FILE"` in this file below to get it working with google sheets.

`.github/workflows/process-multiple-remote-files.yml`

```yaml
name: Process Multiple Remote Files with Miller

on:
  workflow_dispatch: # Allows manual triggering

permissions:
  contents: write

jobs:
  process_all_files:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Install Miller and jq (Global for all runs)
      run: |
        set -eo pipefail # Apply to this setup step as well

        # Install Miller
        MILLER_VERSION="6.10.0" # Make sure this matches if you hardcode it in action.yml too!
        MILLER_ARCHIVE="miller-${MILLER_VERSION}-linux-amd64.tar.gz"
        MILLER_URL="https://github.com/johnkerl/miller/releases/download/v${MILLER_VERSION}/${MILLER_ARCHIVE}"
        echo "Downloading Miller from: ${MILLER_URL}"
        wget --quiet ${MILLER_URL}
        tar --extract --gzip --file ${MILLER_ARCHIVE}
        sudo mv miller-${MILLER_VERSION}-linux-amd64/mlr /usr/local/bin/
        mlr --version

        # Install jq (JSON processor for shell scripting)
        echo "Installing jq..."
        sudo apt-get update && sudo apt-get install -y jq
        jq --version
      shell: bash

    - name: Process each file from config
      id: process-files # Add an ID to this step to access its outputs
      run: |
        set -eo pipefail
        CONFIG_FILE="config.json"
        if [ ! -f "$CONFIG_FILE" ]; then
          echo "Error: Configuration file '$CONFIG_FILE' not found."
          exit 1
        fi

        TOTAL_FILES=$(jq '. | length' "$CONFIG_FILE")
        echo "Found $TOTAL_FILES files to process from $CONFIG_FILE."

        jq -c '.[]' "$CONFIG_FILE" | while IFS= read -r i; do
          # Extract variables for the current file
          URL=$(echo "$i" | jq -r '.url')
          OUTPUT_FILENAME=$(echo "$i" | jq -r '.output_filename')
          COLUMNS_TO_DELETE_ARRAY=$(echo "$i" | jq -r '.columns_to_delete | @csv')
          COLUMNS_TO_DELETE=$(echo "${COLUMNS_TO_DELETE_ARRAY}" | sed 's/"//g') # Remove quotes from @csv output
          MILLER_FORMAT_FLAGS=$(echo "$i" | jq -r '.miller_format')

          echo "--- Processing: $URL ---"
          echo "Output filename: $OUTPUT_FILENAME"
          echo "Columns to delete: [${COLUMNS_TO_DELETE}]"
          echo "Miller format flags: ${MILLER_FORMAT_FLAGS}"

          # --- Start of per-file processing logic (formerly in composite action) ---

          # Create unique temporary file name
          TEMP_INPUT_FILE=$(mktemp)
          echo "Created temporary file: $TEMP_INPUT_FILE"

          # Ensure the temporary file is removed even if the script fails
          trap "rm -f \"$TEMP_INPUT_FILE\"" EXIT

          # 1. Download the file
          echo "Downloading $URL to $TEMP_INPUT_FILE..."
          curl -L "$URL" > "$TEMP_INPUT_FILE"

          echo "Downloaded $TEMP_INPUT_FILE head:"
          head "$TEMP_INPUT_FILE"

          # 2. Delete unwanted columns using Miller
          echo "Processing $TEMP_INPUT_FILE with Miller..."
          if [ -n "${COLUMNS_TO_DELETE}" ]; then
            echo "mlr ${MILLER_FORMAT_FLAGS} cut -x -f ${COLUMNS_TO_DELETE} $TEMP_INPUT_FILE > ${OUTPUT_FILENAME}"
            mlr ${MILLER_FORMAT_FLAGS} cut -x -f "${COLUMNS_TO_DELETE}" "$TEMP_INPUT_FILE" > "${OUTPUT_FILENAME}"
          else
            echo "No columns specified for deletion. Copying original to output."
            cp "$TEMP_INPUT_FILE" "${OUTPUT_FILENAME}"
          fi

          # Check for successful output file creation
          if [ ! -f "${OUTPUT_FILENAME}" ]; then
            echo "Error: Processed file '${OUTPUT_FILENAME}' was not created."
            exit 1
          fi
          echo "Processed ${OUTPUT_FILENAME} head:"
          head "${OUTPUT_FILENAME}"

          # Temporary file cleanup handled by trap
          echo "--- Finished processing ${OUTPUT_FILENAME} ---"
          echo ""

        done # End of while loop for config items

      shell: bash

    - name: Commit and push
      run: |-
        git config user.name "Automated"
        git config user.email "actions@users.noreply.github.com"
        git add '*.csv'
        git add '*.tsv'
        timestamp=$(date -u)
        git commit -m "${timestamp}" || exit 0
        git pull --rebase
        git push
```

## Some notes to self

- Can't expand miller verb names ie `-x` **cannot** be written as `-exclude` no matter what google gemini tells you.
- Scoping of variables in github actions is a bit confusing to me. Even with a variable declared outside the do loop, while I could update the variable inside the do loop, then when the loop was exited no changes persisted.
- I'm doing `git add '*.csv'` + `git add '*.tsv'` because if I do `git add --all` it will also add the Miller downloads that I did to install Miller which I don't want stored in my repo.
- I strongly suspect the above code could be tidied up and improved... see below!

## Code caveat

The above code was generated by a conversation with google gemini. While it works and I am confortable I understand each step in principle, gemini sent me off down numerous rabbit holes in prior versions so I'm sure there are improvements to be made.
