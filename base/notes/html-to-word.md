---
title: Opening an html file with microsoft word - how to use css to control styles and layouts
date: 2025-08-21
tags: [css, word, html, eleventy]
---

# Opening an html file with microsoft word - how to use css to control styles and layouts

## Why would you want to do this?

In my case because I had created a "choose your own adventure" story in a database and wanted to output that story to a book file that I could upload to Amazon's Kindle Direct Publishing service. Ultimately that file is a pdf file, but the pdf file is created by MS Word where you can carefully check or amend the formatting.

I created the initial html book file using Eleventy and iterating over the database. I then opened it with Word for "manual post build processing" (ie formatting). There was a quite a lot of messing around to do. It is a time saver if you can do as much of the formatting up front in the html file.

Interestingly as at the time of writing (August 2025) AI google gemini didn't know how to solve this problem. However there are some useful reference points on the internet.

## Just use normal css right?

Word uses a subset of css with a few quirks of its own. Here's what doesn't work:

- External style sheets don't work. All css styles have to be inlined or in the head.
- Quantities like `px`, which get converted. Instead for font size X you need to use `pt` units.
- `@page` styling. At least not unless you apply them to div set up especially for that purpose.
- more modern css like `margin-inline`. Instead use the old fashioned `margin`.

The best way to figure out how to do a specific thing is to do that thing in a `.docx` file, then save as an `htm` web file then open it up and have a look.

## Useful links

- This was handy reading, and if you have the right setup you can use the code directly and it will solve a lot of these problems for you: https://github.com/metanorma/html2doc.
- It also references this pdf document which was the most useful resource for me: https://rodriguezcommaj.com/assets/resources/microsoft-office-html-and-xml-reference.pdf

## What I did

- Put styles in a `<style></style>` element in the head
- Set margin to 0 on the body. This is really important because otherwise you will get undeletable margin in Word. `margin: 0pt`
- Set the font family on the body. `font-family: Garamond, Baskerville, serif`
- Style the p element, note that `font-size:10pt` gets translated into font size 10 in Word, and `10px` doesn't. Also note `line-height` needs to be a % as a normal number ie 1.3 doesn't work:

```css
p {
  font-size:  10pt;
  text-align: justify;
  text-indent: 1em;
  margin: 0px;
  line-height:130%;
  }
```

- style the heading elements
- including for `h3` my chapter headings the line `page-break-before:always` which is self explanatory
- styled special blocks of text for example poems:

```css
.text-poem p {
  text-align:left;
  text-indent:0px;
  font-style:italic;
  margin: 1em
}
```

- Now onto the tricky bits, the page setup.
- The first bit tells you that you are creating a book with left and right pages
- Then each `@page Wordsection` defines the layout for that section.
- In order for this to apply you need to put all of your document into one or more `<div>`s like so `<div class="WordSection1"></div>` 
- `mso-page-numbers:1` will tell the page numbers to start from 1 at the beginning of this section.

```css
 @page
	{mso-mirror-margins:yes;
	mso-facing-pages:yes;}
@page WordSection1
	{size:5.0in 8.0in;
	margin:.7in .6in .6in .8in;
	mso-header-margin:.4in;
	mso-footer-margin:.3in;}
@page WordSection2
	{size:5.0in 8.0in;
	margin:.7in .6in .6in .8in;
	mso-header-margin:.4in;
	mso-footer-margin:.3in;
	mso-page-numbers:1;}
div.WordSection1
	{page:WordSection1;}
div.WordSection2
	{page:WordSection2;}
```

- The above took me a while to figure out and it is the best way to quickly set up a word doc of the right size, critical when printing a book!

## html structure

- As noted above you will need to put your html in a div per section
- Page breaks are `<br clear=all style='mso-special-character:line-break; page-break-before:always'>`
- Section breaks (continuous) are: `<br clear=all style='page-break-before:auto; mso-break-type:section-break'>`
- If you want to use a page breaking section break, change to `page-break-before:always`.

## Things that still won't work

- You will need to add headers and footers manually. You can add these from a file but it needs to be a separate file living in a sub folder. Save a `.docx` with a header as html and see what I mean. It is a bit of a dog's dinner.
- This process won't allow you to style all the paragraph elements in one go when in Word. Unlike headings p elements don't have a particular style name applied so cannot be targeted all in one go. Some way of giving all p elements a particular class name would work - that class name then becomes a named style (albeit hidden in a menu). I didn't try to find a solution to this because I want to apply all styles ahead of time.
- Internal links won't work. The href seems to be the problem. I'm sure there is a way to make them work but I didn't use them so didn't figure it out.

## Other post formatting steps

- Find and replace `"` with `"` to do smart curly quotes. Same with `'` and `'`.
- I also found that my markdown it engine missed a few italics so I did a word find `\_(*)\_` and replace with `\1` (+ format = italic) to bulk update - you need to select the `use wildcards` option in the Word dialogue box.
- Create pdf and make sure that fonts are embedded.
