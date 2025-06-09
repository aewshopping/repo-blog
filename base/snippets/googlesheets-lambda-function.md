---
title: You can use a map function together with lambda function in Googlesheets to apply a formula to every cell in an array
date: 2025-01-10
tags: [googlesheets]
---
# You can use a map function together with lambda function in Googlesheets to apply a formula to every cell in an array

I needed to trim every cell in an array of cells in google sheets.
Google map functions with lambda made this very easy.

As per docs eg: 

```
MAP(A1:A5, LAMBDA(cell, cell*2))
```

function with range as input.

https://support.google.com/docs/answer/12568985?hl=en-GB