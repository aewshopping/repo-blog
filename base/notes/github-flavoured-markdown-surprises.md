---
title: Surprising features of github flavoured markdown
date: 2025-06-11
tags: github
---
# Surprising features of github flavoured markdown

All of the usual markdown stuff works, but some nice extras too. For example:

## Funky blockquotes

```markdown
> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.
```
Rendering like this.

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.


## Footnotes

```markdown
I was pretty suprised[^1] to see that footnotes work too[^1]
[^1]: Where's it gone?
```

I was pretty suprised[^1] to see that footnotes work too[^2]
[^1]: Where's it gone?

## Code syntax highlighting

This is perhaps not surprising but worth calling out because it works so nicely:

````
```javascript
const transformObjectFancy = (obj) =>
  Object.entries(obj).reduce(
    (acc, [key, value], index) => ({
      ...acc,
      [`${key.toUpperCase()}_${index + 1}`]:
        typeof value === 'string'
          ? value.split('').reverse().join('')
          : Array.isArray(value)
            ? value.map((item) => (typeof item === 'string' ? item.toUpperCase() : item))
            : value,
    }),
    {}
  );
```
````

```javascript
const transformObjectFancy = (obj) =>
  Object.entries(obj).reduce(
    (acc, [key, value], index) => ({
      ...acc,
      [`${key.toUpperCase()}_${index + 1}`]:
        typeof value === 'string'
          ? value.split('').reverse().join('')
          : Array.isArray(value)
            ? value.map((item) => (typeof item === 'string' ? item.toUpperCase() : item))
            : value,
    }),
    {}
  );
```


[^2]: I am a big fan of being able to do markdown footnotes
