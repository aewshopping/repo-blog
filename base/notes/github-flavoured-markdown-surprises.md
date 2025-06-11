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

## 3D models .stl files

```stl
solid combined_pyramids

  # --- Base Pyramid ---

  # Base (bottom square - two triangles)
  facet normal 0.000000 0.000000 -1.000000
    outer loop
      vertex -5.000000 -5.000000 0.000000
      vertex 5.000000 -5.000000 0.000000
      vertex 5.000000 5.000000 0.000000
    endloop
  endfacet
  facet normal 0.000000 0.000000 -1.000000
    outer loop
      vertex -5.000000 -5.000000 0.000000
      vertex 5.000000 5.000000 0.000000
      vertex -5.000000 5.000000 0.000000
    endloop
  endfacet

  # Side 1 (front: -5, -5, 0 to 5, -5, 0 to 0, 0, 8)
  facet normal 0.000000 -0.800000 0.600000
    outer loop
      vertex -5.000000 -5.000000 0.000000
      vertex 5.000000 -5.000000 0.000000
      vertex 0.000000 0.000000 8.000000
    endloop
  endfacet

  # Side 2 (right: 5, -5, 0 to 5, 5, 0 to 0, 0, 8)
  facet normal 0.800000 0.000000 0.600000
    outer loop
      vertex 5.000000 -5.000000 0.000000
      vertex 5.000000 5.000000 0.000000
      vertex 0.000000 0.000000 8.000000
    endloop
  endfacet

  # Side 3 (back: 5, 5, 0 to -5, 5, 0 to 0, 0, 8)
  facet normal 0.000000 0.800000 0.600000
    outer loop
      vertex 5.000000 5.000000 0.000000
      vertex -5.000000 5.000000 0.000000
      vertex 0.000000 0.000000 8.000000
    endloop
  endfacet

  # Side 4 (left: -5, 5, 0 to -5, -5, 0 to 0, 0, 8)
  facet normal -0.800000 0.000000 0.600000
    outer loop
      vertex -5.000000 5.000000 0.000000
      vertex -5.000000 -5.000000 0.000000
      vertex 0.000000 0.000000 8.000000
    endloop
  endfacet

  # --- Inverted Pyramid ---
  # Note: Apex of inverted pyramid is now at (0,0,4.000001). Base is at (0,0,8.000001)

  # Base of inverted pyramid (top square - two triangles)
  # This is the top surface where the inverted pyramid sits
  facet normal 0.000000 0.000000 1.000000
    outer loop
      vertex -2.500000 -2.500000 8.000001
      vertex -2.500000 2.500000 8.000001
      vertex 2.500000 2.500000 8.000001
    endloop
  endfacet
  facet normal 0.000000 0.000000 1.000000
    outer loop
      vertex -2.500000 -2.500000 8.000001
      vertex 2.500000 2.500000 8.000001
      vertex 2.500000 -2.500000 8.000001
    endloop
  endfacet

  # Side 1 (inverted, front: -2.5, -2.5, 8.000001 to 2.5, -2.5, 8.000001 to 0, 0, 4.000001)
  facet normal 0.000000 0.800000 -0.600000
    outer loop
      vertex 2.500000 -2.500000 8.000001
      vertex -2.500000 -2.500000 8.000001
      vertex 0.000000 0.000000 4.000001
    endloop
  endfacet

  # Side 2 (inverted, right: 2.5, -2.5, 8.000001 to 2.5, 2.5, 8.000001 to 0, 0, 4.000001)
  facet normal -0.800000 0.000000 -0.600000
    outer loop
      vertex 2.500000 2.500000 8.000001
      vertex 2.500000 -2.500000 8.000001
      vertex 0.000000 0.000000 4.000001
    endloop
  endfacet

  # Side 3 (inverted, back: 2.5, 2.5, 8.000001 to -2.5, 2.5, 8.000001 to 0, 0, 4.000001)
  facet normal 0.000000 -0.800000 -0.600000
    outer loop
      vertex -2.500000 2.500000 8.000001
      vertex 2.500000 2.500000 8.000001
      vertex 0.000000 0.000000 4.000001
    endloop
  endfacet

  # Side 4 (inverted, left: -2.5, 2.5, 8.000001 to -2.5, -2.5, 8.000001 to 0, 0, 4.000001)
  facet normal 0.800000 0.000000 -0.600000
    outer loop
      vertex -2.500000 -2.500000 8.000001
      vertex -2.500000 2.500000 8.000001
      vertex 0.000000 0.000000 4.000001
    endloop
  endfacet

endsolid combined_pyramids
```

[^2]: I am a big fan of being able to do markdown footnotes
