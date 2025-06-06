---
date: 2025-01-30
tag: css
title: Tweaking colour to some other colour in css
---
For example, changing the html colour green into something 'greener': 

```css
green     /*  h=120 s=100% l=25%  */
hsl(from green calc(h * 2) s l)    /*  h=240 s=100% l=25%  */
```
Useful summary: https://developer.chrome.com/blog/css-relative-color-syntax
