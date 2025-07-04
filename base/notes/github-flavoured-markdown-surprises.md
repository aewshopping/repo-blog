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

> [! NOTHING]
> Presumably if rendered elsewhere it will look like this.

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

## Geojson on a map

```geojson
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "London, England"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -0.1278,
          51.5074
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Paris, France"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.3522,
          48.8566
        ]
      }
    }
  ]
}

```
## csv data

Csv doesn't work - except when the whole file is a csv file.

```.csv
Name,Birthday,Hair_Color
Alice,1990-05-15,Brown
Bob,1988-11-22,Black
Charlie,1995-03-10,Blonde
Diana,1992-07-01,Red
Eve,1998-09-28,Brown
Frank,1985-01-12,Black
Grace,1993-06-03,Blonde
```

## 3d shapes (stl files) 

This works too but I can't think of any situation where I would need it.

## Mathematical equations

Mathematical Equations (via LaTeX/KaTeX): GitHub often supports rendering mathematical expressions written in LaTeX syntax within Markdown files using KaTeX

Example code:

The quadratic formula is: `$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$`

Rendering like this:

The quadratic formula is: $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$

This one...

```
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

...renders like this

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

[^2]: I am a big fan of being able to do markdown footnotes
