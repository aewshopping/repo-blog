---
title: How to add some spring or bounce in your CSS transitions
tags: css
date: 2025-10-30
---
# How to add some spring or bounce in your CSS transitions

Here is a [good tutorial on the `linear()` function](https://www.joshwcomeau.com/animation/linear-timing-function/) that you can use to replace `ease` or whatever in your CSS transition.

Here is an example of how to apply it, from the above tutorial: 

```css
.block {
  transition:
    transform 500ms linear(0, 0.1, 0.25, 0.5, 0.68, 0.8, 0.88, 0.94, 0.98, 0.995, 1);
}
```

Here is a good website to generate those numbers you need: easingwizard.com.

Here is a good set of parameters, that gave me a mild spring effect that I liked:

- `spring`
- `snap`
- set  'damp` to 100