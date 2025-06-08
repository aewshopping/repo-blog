---
title: How to us regex to wrap text paragraphs in <p> tags
date: 2025-01-17
tags: [regex, javascript]
---
# How to us regex to wrap text paragraphs in <p> tags

```regex
string.replace(/\n(\w.*)/g,'<p>$1</p>')
```

the regex expression is the tricky bit: `\n(\w.*)/g`
Test it out here: https://regex101.com/

`\n` finds every location that is preceded by a line-break

`\w.*`
... and then immediately has a `\w` after it (ie any letter or number), repeated by any character `.` however many times until you get to a line-break `.*`. Ie this is the bit that higlights the whole paragraph.

This excludes lines starting with # or - for example. Because the `#'` character is not a letter or number.

This second bit is put into brackets to make it a "capture group"

`(\w.*)`

This means it can be referenced later in the replace function by a `$1`. ie the first capture group. The second capture group would be `$2`.

/g means global ie find all instances of this match.

In the replace function we are wrapping each instance of the capture group `$1` in between paragraph tags to render to html:
`<p>$1</p>`

#### nb

There is almost certainly a better way to do this because I don't think it will pick up paragraphs starting on the first line of a document. I had trouble trying to do this because the regex code for "first character in a document" didn't seem to work in most implementations of regex.