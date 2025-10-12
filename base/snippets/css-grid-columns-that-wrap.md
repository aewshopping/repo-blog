---
title: CSS grid and repeating columns which wrap
tags: css
date: 2025-10-12
---
# CSS grid: repeating columns which wrap

How to define a grid which wraps elements onto the next row, such that columns are never less than a minimum width but also expand to take up available horizonal space:


```css
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
```

1. repeat(): define a repetitive pattern for your grid columns.

2. auto-fit: create as many columns as possible to fit within the container. When the screen shrinks, columns will "wrap" to a new row instead of just getting narrower forever.

3. minmax(250px, 1fr): main width control bit:

  3.1. Minimum Width (250px): A column will never be narrower than 250px (unless the container itself is smaller than this value).

  3.2. Maximum Width (1fr): A column can grow up to 1fr (one fraction of the available space). This means if there's extra room on a row, the columns will expand to fill the entire available width.