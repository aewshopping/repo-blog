---
title: Github actions to download multiple files from remote urls, and delete columns
date: 2025-06-15
tags: github-actions
---
# Github actions to download multiple files from remote urls, and delete columns

## Folder structure

To implement the custom composite action, you'll need to create a new directory and file within your repository.

Here's the structure:

```
your-repo/
├── .github/
│   ├── workflows/
│   │   └── process-multiple-files-composite.yml  <-- Your main workflow
│   └── actions/
│       └── process-single-file/
│           └── action.yml                     <-- The custom composite action
└── config.json                                  <-- Your configuration file
```

## Config file

The `config.json` file will look like this:

```json
[
  {
    "url": "https://raw.githubusercontent.com/datasets/population/main/data/population.csv",
    "output_filename": "processed_population.csv",
    "columns_to_delete": ["Year", "Value"],
    "miller_format": "--csv"
  },
  {
    "url": "https://raw.githubusercontent.com/datasets/gdp/main/data/gdp.tsv",
    "output_filename": "processed_gdp.tsv",
    "columns_to_delete": ["Country Code"],
    "miller_format": "--tsv"
  },
  {
    "url": "https://raw.githubusercontent.com/datasets/co2-emissions/main/data/co2-emissions.csv",
    "output_filename": "processed_co2_emissions.csv",
    "columns_to_delete": ["Unit"],
    "miller_format": "--csv"
  }
]
```

## Custom Composite Action

`.github/actions/process-single-file/action.yml`

```yaml
# .github/actions/process-single-file/action.yml
name: 'Process Single Data File with Miller'
description: 'Downloads a data file, deletes specified columns using Miller, and cleans up.'

inputs:
  file_url:
    description: 'The URL of the remote input data file.'
    required: true
  output_filename:
    description: 'The desired local output filename for the processed file.'
    required: true
  columns_to_delete:
    description: 'Comma-separated string of column names to delete (e.g., "Col1,Col2"). Can be empty.'
    required: true
  miller_format:
    description: 'Miller format flags (e.g., --csv, --tsv, --json).'
    required: true

outputs:
  processed_filepath:
    description: "The path to the processed output file."
    value: ${{ inputs.output_filename }} # Expose the output filename

runs:
  using: "composite"
  steps:
    - name: Download, Process, and Clean Up
      run: |
        set -eo pipefail # Exit immediately if a command exits with a non-zero status; also fails if any command in a pipeline fails.

        echo "--- Processing: ${{ inputs.file_url }} ---"
        echo "Output filename: ${{ inputs.output_filename }}"
        echo "Columns to delete: [${{ inputs.columns_to_delete }}]"
        echo "Miller format flags: ${{ inputs.miller_format }}"

        # Use mktemp to create a unique temporary file name without a specific suffix.
        # This simplifies the code as requested.
        TEMP_INPUT_FILE=$(mktemp) # <<< SIMPLIFIED HERE: Removed --suffix logic
        echo "Created temporary file: $TEMP_INPUT_FILE"

        # Ensure the temporary file is removed even if the script fails
        trap "rm -f \"$TEMP_INPUT_FILE\"" EXIT

        # 1. Download the file
        echo "Downloading ${{ inputs.file_url }} to $TEMP_INPUT_FILE..."
        curl --output "$TEMP_INPUT_FILE" "${{ inputs.file_url }}"

        echo "Downloaded $TEMP_INPUT_FILE head:"
        head "$TEMP_INPUT_FILE"

        # 2. Delete unwanted columns using Miller
        echo "Processing $TEMP_INPUT_FILE with Miller..."
        if [ -n "${{ inputs.columns_to_delete }}" ]; then
          mlr ${{ inputs.miller_format }} cut --exclude --fields "${{ inputs.columns_to_delete }}" "$TEMP_INPUT_FILE" > "${{ inputs.output_filename }}"
        else
          echo "No columns specified for deletion. Copying original to output."
          cp "$TEMP_INPUT_FILE" "${{ inputs.output_filename }}"
        fi

        # Check for successful output file creation
        if [ ! -f "${{ inputs.output_filename }}" ]; then
          echo "Error: Processed file '${{ inputs.output_filename }}' was not created."
          exit 1
        fi
        echo "Processed ${{ inputs.output_filename }} head:"
        head "${{ inputs.output_filename }}"

        # The 'trap' command above handles the cleanup of $TEMP_INPUT_FILE automatically

        echo "--- Finished processing ${{ inputs.output_filename }} ---"
        echo ""

      shell: bash
```

## Main Workflow file

`.github/workflows/process-multiple-files-composite.yml`

```yaml
# .github/workflows/process-multiple-files-composite.yml
name: Process Multiple Remote Files with Miller (using Composite Action)

on:
  workflow_dispatch: # Allows manual triggering

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

    - name: Process each file from config
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
          URL=$(echo "$i" | jq -r '.url')
          OUTPUT_FILENAME=$(echo "$i" | jq -r '.output_filename')
          COLUMNS_TO_DELETE_ARRAY=$(echo "$i" | jq -r '.columns_to_delete | @csv')
          COLUMNS_TO_DELETE=$(echo "${COLUMNS_TO_DELETE_ARRAY}" | sed 's/"//g') # Remove quotes from @csv output
          MILLER_FORMAT_FLAGS=$(echo "$i" | jq -r '.miller_format')

          echo "Calling custom action for $OUTPUT_FILENAME..."
          ./.github/actions/process-single-file/action.yml --file_url "$URL" \
                                                          --output_filename "$OUTPUT_FILENAME" \
                                                          --columns_to_delete "$COLUMNS_TO_DELETE" \
                                                          --miller_format "$MILLER_FORMAT_FLAGS"

        done # End of while loop

    - name: Upload all processed files as artifacts
      uses: actions/upload-artifact@v4
      with:
        name: all-processed-data-files
        path: |
          *.csv
          *.tsv
          *.txt
          *.data # Include any other potential output extensions
        retention-days: 7
```

## Further changes I need to make to the code

All files extracted should be committed to the repo.

## Massive caveat

The above code was all generated by a conversation with google gemini and **has not been tested even once!** Therefore this is more a work in progress...
