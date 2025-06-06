---
date: 2025-01-30
tags: css
title: focus-visible is a good way to register focus state
---
focus-visible is a good way to register focus state. This is because it uses the browser engine to figure out when to indicate the focus state ie not when on a mouse click or touch event.

Therefore 
```css
.element:has(input:focus-visible) {outline: 2px solid black}
```
is a good way to style input element groups.
