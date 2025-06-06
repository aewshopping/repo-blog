---
date: 2025-01-26
tag: [css, html]
title: How to style html details elements with css
---
A bit of a pain to get the details styling right.

With details open the details text is underneath the summary marker rather than underneath the summary text.

You have to pull the summary content to the left with a negative margin. 

You can also style the details content without impacting the summary text by styling the details-contents

```css
details::details-content {
  border: 5px dashed hotpink;
}
```

Or to just style when open: 
```css
[open]::details-content {
  border: 5px dashed hotpink;
}
```

https://developer.chrome.com/blog/styling-details

I wanted to open the details content to the right of the summary, and not below:

Option 1: a tab effect

```css
details[open] {
    margin-left: 100px; // push to the right 
}
details[open] summary {
    margin-left: -100px; // pull out of details to left 
}
details[open]::details-content {
    margin-top: -27px; // pull up level with summary text
}
```

Option 2: a block effect

```css
details[open]::details-content {
    margin-top: -27px; // pull up level with summary text
    margin-left: 100px; // push to right off summary text
}
```

In both case you need to be careful that the summary text isn't too long and overlaps with detail-content text
