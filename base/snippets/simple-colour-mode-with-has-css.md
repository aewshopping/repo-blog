---
date: 2025-01-28
tags: css
title: Simple colour mode option in css with has selector
---
Set css variables and apply to body element depending on value of checked input (below eg is a select input).

If you are toggling between two modes can do it with checkbox and don't need to name the value.

```css
body:has(option[value="pony"]:checked) {
  --font-family: cursive;
  --text-color: #b10267;
  --body-background: #ee458e;
  --main-background: #f4b6d2;
}
body:has(option[value="wine"]:checked) {
  --font-family: avenir, helvetica;
  --text-color: white;
  --body-background: black;
  --main-background: brown;
}
body:has(option[value="molly"]:checked) {
  --font-family: helvetica;
  --text-color: white;
  --body-background: #6c3;
  --main-background: #09c;
}
```

https://webkit.org/blog/13096/css-has-pseudo-class/
