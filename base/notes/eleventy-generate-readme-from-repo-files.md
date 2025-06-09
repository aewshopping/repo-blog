---
title: Auto generating an index readme file from files in a repo
date: 2025-06-08
tags: eleventy
---
# Auto generating an index readme file from files in a repo

Eleventy will create an object for us that describes a  a bunch of markdown files. This is the `collections` object. 

(It will also transform those markdown files into html but for this purpose I am not really interested in this.)

I want to take the `collections` object and use it to create a list of the all the files in a certain directory in the repo. This list will then be output to the root level readme.me.

## Folder structure

Firstly create this folder structure: 

```
.
├── base/
│   ├── notes/
│   │   ├── file1.md
│   │   ├── file2.md
│   │   └── file3.md
│   └── readme-generator.md
├── readme.md
└── eleventy.config.js
```

What we want to do is use everything in the `base` directory as input. And output to the root of the project. 

## Eleventy config setup

To do this we can set up the `eleventy.config.js` like this: 

```JavaScript
export default async function(eleventyConfig) {

    eleventyConfig.setInputDirectory("base");

    eleventyConfig.setOutputDirectory("");
};
```

## Templating the readme file

The key file is the `readme-generator.md` file. This provides the 'template' instructions for eleventy to create readme.md. It will look something like this: 

```yaml
---
permalink: /README.md
eleventyExcludeFromCollections: true
templateEngineOverride: njk
---
# This is a title 

More stuff here.
```

1. The first property `permalink` tells eleventy to build the file at the root of the output directory (which we have already specified as the root of the repo in the config file) and name it `README.md`. It will override whatever was there previously. 

2. The second line `eleventyExcludeFromCollections: true` means that this file does not itself become part of the index that we are building. 

3. The third and final line `templateEngineOverride: njk` tells eleventy to _only_ use nunjucks to parse this file.

The key thing is that we _don't_ want eleventy to translate the markdown into html which it will do by default. We are going to rely on the GitHub markdown engine to do this nicely for us and keep our file as clean markdown syntax.

## Ignoring the built files

The other key piece is that we want to throw away the rest of the files that eleventy is automatically outputting. 

We can set up our .gitignore file to do this in the normal way, along with the node_modules.

```
node_modules/
/notes/
```
The first forward slash in front of notes is important! 

It means only the notes folder located at the root of ignored not _all_ notes folders (which would be `notes/` - don't do this!). If you omit the first forward slash then all your _input_ notes will also be erased and forgotten when you commit, which would be a shame. 

Now when you run eleventy you will get a very boring readme.md created. 

## Adding templating instructions to the readme generator

To make it more interesting we will add some templating instructions to the `readme-generator.md` file.

```nunjucks
permalink: /README.md
eleventyExcludeFromCollections: true
templateEngineOverride: njk
---
# My collection of notes

{% for note in collections.all %}
- {{ note.data.title }}
{% endfor %}
```

You can do all the normal eleventy / nunjucks  templating stuff here of course, including group by tags which I have a note about too.

## Turn off templating for notes files

The final thing that I did was to prevent eleventy from applying any rendering to the original notes. I came across an issue where I wanted to show some nunjucks code within some triple markdown backticks. But eleventy still tried to parse the nunjucks code leading to an error. 

To stop this without having to change your markdown notes, you can apply a yaml property to the notes files of `templateEngineOveride: html`. This means that eleventy used only the 'html' templating language to transform the markdown files - i.e. no markdown, no nunjucks. (This is equivalent to using `false` but for some reason `false` didn't work for me.)

Because it is needlessly laborious to apply this to the front matter of each md file we can apply it to all files in the folder at once by putting a json file with the same name as the folder in that folder thusly:

```
.
└── base/
    └── notes/
        ├── file1.md
        ├── file2.md
        ├── file3.md
        └── notes.json
```

... and in that folder write: 

```json
{
  "templateEngineOverride": "html"
}
```

## `eleventy --serve` doesn't work, but you don't need it

You can't `eleventy --serve` with this setup because there is no index.html file at the root of the output to serve. Instead I just `npx @11ty/eleventy` in the terminal and use the markdown preview option in VS Code to see the output (the disadvantage of this is that you can't test any links you have templated).

## Building with GitHub actions

Finally you may want the convenience of rebuilding the readme with a button click in GitHub actions. In which case put a yaml file in the usual place:

```
.
├── .github/
│   └── workflows/
│       └── rebuild-readme.yaml
└── base/
    └── notes/
        ├── file1.md
        ├── file2.md
        ├── file3.md
        └── notes json
```

...and write something like this in the file. This file should be generic enough to work out of the box.

```yaml
name: Build and Commit Eleventy Site to Main

on:
  workflow_dispatch: # This makes the workflow manually triggerable

jobs:
  build:
    runs-on: ubuntu-latest # Use the latest Ubuntu runner

    permissions:
      contents: write # Grant write permission to the GITHUB_TOKEN for committing

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4 # Action to checkout your repository code

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 'latest' # Updated to use the latest Node.js version

      - name: Install npm dependencies
        run: npm install # Install all dependencies listed in package.json

      - name: Build Eleventy site
        run: npx @11ty/eleventy

      - name: Commit and push
        run: |-
          git config user.name "Automated"
          git config user.email "actions@users.noreply.github.com"
          git add --all
          timestamp=$(date -u)
          git commit -m "${timestamp}" || exit 0
          git pull --rebase
          git push
```

Now you can go to actions / this workflow and trigger the rebuild.
