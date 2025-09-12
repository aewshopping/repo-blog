---
title: Converting html to pdf or epub file
tags: [epub]
date: 2025-09-11
---
# Converting html to pdf or epub file

Options for compiling books as easily as possible - on the assumption that I have already written all the words.

## For paperback

Objective - get to a printed book manuscript from an html web page as automatically as possible, using a much open source software as possible.

### Creating the html page (common to all options)

- My test case built out an html file from an `airtable` base
- Using `eleventy` to iterate over the records in the base and adding these to a single big html file
- The css was added to a `style` tag in the head to keep everything in one file.

### Option 1: html --> Word --> pdf

- In the `style` element, add ms word specific formatting options such as page size, margins etc in CSS - using the word specfic syntax as needed (see [details on word specific syntax]()). Separate style sheets are not supported by word when importing.
- Optionally add header and footer details. This has to live in a separate html file, referenced in the main html page with a relative reference. The best way to figure out what this header / footer html page should look like is to export a word `.docx` as html and open it up, noting it is mostly fluff.
- The main html file will need to reference the header / footer file via a relative path (again look at word html export file structure and syntax).
- With `MS Word` open the downloaded html file
- Then export as `pdf` making sure you embed the fonts.
- It works but it is a bit manual, plus relies on Word which you may or may not have.

### Option 2: html --> Calibre --< pdf

- I had a brief go at this. While it is an option in `calibre` I got errors when running this job and it didn't work. 
- It looks like you can specify all the things you need to re paper size etc - this will be done as options to the calibre process / command line tool, not via css.
- advantage is all software is open source, and you can run as a straight through process via Github Actions if you want.
- disadvantage is that I couldn't get it to work, although I didn't try for more than a minute.
- [Mobileread forums]() suggest that Calibre is generally not good right now for pdf conversion.

### Option 3: html --> libre office --> pdf

- Not yet tried but presumably similar to option 1.
- From my tiny amount of time looking at `LibreOffice` I was very impressed. It looks like it has all the same stuff you can find in `MS Word`, albeit with a bit of figuring it out learning curve. 
- The question is can you specify all the things you need to re paper size etc in the CSS within the html import file?
- Advantage is all software is open source.

## For an ebook

Objective - get to a ebook manuscript from an html web page as automatically as possible, using a much open source software as possible. Specifically I am trying to publish the ebook on Amazon.

Important! 
Updating a kindle book doesn't push through to previously bought copies. Ie you need to get it right first time!

### Option 1: from html --> Word --> Kindle Create

- `Kindle Create` is a very clunky, can't make any more than very minimal changes without it being very very manual and therefore taking a very very long time.
- Therefore need to get everything set up in perfectly in `MS Word` before you import.
- I struggled with getting Kindle Create to recognise chapters. h2 elements didn't work. Maybe could try h1 for chapter headings. I suspect sub chapter creation would be even more of a pain / be impossible.

### Option 2: from html --> Word --> LibreOffice --> epub

- `LibreOffice` looks pretty powerful, could probably import html to libre but didn't try this.
- The point of this convoluted workflow is simply to access `LibreOffice` export to epub functionality! 
- Could you go straight into LibreOffice with html? Maybe yes?
- It is very limited in the `epub` export options though.
- I needed to set all chapter headings to h1 to get recognised as such.

### Option 3: from html --> Calibre --> epub

- This is definitely the best option, pretty seamless after figuring it out.
- First you need to `Add book to library` in Calibre. Then add the html file. Confusingly it refers to the file as a zip file but fear not, this is just because it is adding a few other bits and bobs to the original html file - no doubt manifests or something.
- Then `Convert`. Select output `epub`
- Options I needed to set:
  - Chapters recognition string - simplify to be any h1 or h2 elements.
  - Smarten quotes - tick this box
  - Regex find `_(.*?)_` and replace `<i>\1</i>` - to catch the few markdown italics that my markdown parser always misses.
  - Set h2 as sub chapters (h1 as main chapters)

- Calibre is also by far and away the best way of _editing_ epub files that I have found and allows you to mess with all the code in all the files, find and replace across multiple files, regex etc etc. Excellent.
