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

  # --- Base Pyramid (bottom) ---
  # Base side: 10, Height: 8
  # Base at Z=0, Apex at Z=8

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

  # Side 1 (front)
  facet normal 0.000000 -0.800000 0.600000
    outer loop
      vertex -5.000000 -5.000000 0.000000
      vertex 5.000000 -5.000000 0.000000
      vertex 0.000000 0.000000 8.000000
    endloop
  endfacet

  # Side 2 (right)
  facet normal 0.800000 0.000000 0.600000
    outer loop
      vertex 5.000000 -5.000000 0.000000
      vertex 5.000000 5.000000 0.000000
      vertex 0.000000 0.000000 8.000000
    endloop
  endfacet

  # Side 3 (back)
  facet normal 0.000000 0.800000 0.600000
    outer loop
      vertex 5.000000 5.000000 0.000000
      vertex -5.000000 5.000000 0.000000
      vertex 0.000000 0.000000 8.000000
    endloop
  endfacet

  # Side 4 (left)
  facet normal -0.800000 0.000000 0.600000
    outer loop
      vertex -5.000000 5.000000 0.000000
      vertex -5.000000 -5.000000 0.000000
      vertex 0.000000 0.000000 8.000000
    endloop
  endfacet

  # --- Inverted Pyramid (top) ---
  # Base side: 10, Height: 8
  # Base at Z=10, Apex at Z=2 (10 - 8)

  # Base of inverted pyramid (top square - two triangles)
  facet normal 0.000000 0.000000 1.000000
    outer loop
      vertex -5.000000 -5.000000 10.000000
      vertex -5.000000 5.000000 10.000000
      vertex 5.000000 5.000000 10.000000
    endloop
  endfacet
  facet normal 0.000000 0.000000 1.000000
    outer loop
      vertex -5.000000 -5.000000 10.000000
      vertex 5.000000 5.000000 10.000000
      vertex 5.000000 -5.000000 10.000000
    endloop
  endfacet

  # Side 1 (inverted, front)
  facet normal 0.000000 0.800000 -0.600000
    outer loop
      vertex 5.000000 -5.000000 10.000000
      vertex -5.000000 -5.000000 10.000000
      vertex 0.000000 0.000000 2.000000
    endloop
  endfacet

  # Side 2 (inverted, right)
  facet normal -0.800000 0.000000 -0.600000
    outer loop
      vertex 5.000000 5.000000 10.000000
      vertex 5.000000 -5.000000 10.000000
      vertex 0.000000 0.000000 2.000000
    endloop
  endfacet

  # Side 3 (inverted, back)
  facet normal 0.000000 -0.800000 -0.600000
    outer loop
      vertex -5.000000 5.000000 10.000000
      vertex 5.000000 5.000000 10.000000
      vertex 0.000000 0.000000 2.000000
    endloop
  endfacet

  # Side 4 (inverted, left)
  facet normal 0.800000 0.000000 -0.600000
    outer loop
      vertex -5.000000 -5.000000 10.000000
      vertex -5.000000 5.000000 10.000000
      vertex 0.000000 0.000000 2.000000
    endloop
  endfacet

endsolid combined_pyramids
```


```stl
solid irregular_shape

  # --- Bottom Face Triangles (using vertices 1,2,3,4 as a distorted base) ---
  # Triangle 1: (0,0,0) (5,1,0) (4,6,0)
  facet normal 0.000000 0.000000 -1.000000
    outer loop
      vertex 0.000000 0.000000 0.000000
      vertex 5.000000 1.000000 0.000000
      vertex 4.000000 6.000000 0.000000
    endloop
  endfacet
  # Triangle 2: (0,0,0) (4,6,0) (-2,5,0)
  facet normal 0.000000 0.000000 -1.000000
    outer loop
      vertex 0.000000 0.000000 0.000000
      vertex 4.000000 6.000000 0.000000
      vertex -2.000000 5.000000 0.000000
    endloop
  endfacet

  # --- Top Face Triangles (using vertices 5,6,7,8 as a distorted top) ---
  # Triangle 3: (1,1,4) (3,7,4) (6,2,5)
  facet normal 0.000000 0.000000 1.000000  # Simplified normal for top, might need slight adjustment
    outer loop
      vertex 1.000000 1.000000 4.000000
      vertex 3.000000 7.000000 4.000000
      vertex 6.000000 2.000000 5.000000
    endloop
  endfacet
  # Triangle 4: (1,1,4) (-1,4,3) (3,7,4)
  facet normal 0.000000 0.000000 1.000000  # Simplified normal for top
    outer loop
      vertex 1.000000 1.000000 4.000000
      vertex -1.000000 4.000000 3.000000
      vertex 3.000000 7.000000 4.000000
    endloop
  endfacet

  # --- Side Faces (connecting bottom vertices to top vertices) ---

  # Side 1: Connecting (0,0,0)-(5,1,0) to (1,1,4)-(6,2,5)
  # Triangle 5: (0,0,0) (5,1,0) (1,1,4)
  facet normal 0.298142 -0.894427 0.372678 # Normal calculated using (P2-P1)x(P3-P1)
    outer loop
      vertex 0.000000 0.000000 0.000000
      vertex 5.000000 1.000000 0.000000
      vertex 1.000000 1.000000 4.000000
    endloop
  endfacet
  # Triangle 6: (5,1,0) (6,2,5) (1,1,4)
  facet normal 0.298142 -0.894427 0.372678 # Same normal as previous if coplanar
    outer loop
      vertex 5.000000 1.000000 0.000000
      vertex 6.000000 2.000000 5.000000
      vertex 1.000000 1.000000 4.000000
    endloop
  endfacet

  # Side 2: Connecting (5,1,0)-(4,6,0) to (6,2,5)-(3,7,4)
  # Triangle 7: (5,1,0) (4,6,0) (6,2,5)
  facet normal 0.655979 0.163995 0.737976
    outer loop
      vertex 5.000000 1.000000 0.000000
      vertex 4.000000 6.000000 0.000000
      vertex 6.000000 2.000000 5.000000
    endloop
  endfacet
  # Triangle 8: (4,6,0) (3,7,4) (6,2,5)
  facet normal 0.655979 0.163995 0.737976
    outer loop
      vertex 4.000000 6.000000 0.000000
      vertex 3.000000 7.000000 4.000000
      vertex 6.000000 2.000000 5.000000
    endloop
  endfacet

  # Side 3: Connecting (4,6,0)-(-2,5,0) to (3,7,4)-(-1,4,3)
  # Triangle 9: (4,6,0) (-2,5,0) (3,7,4)
  facet normal -0.092848 0.650000 0.750000 # Placeholder, actual calc needed
    outer loop
      vertex 4.000000 6.000000 0.000000
      vertex -2.000000 5.000000 0.000000
      vertex 3.000000 7.000000 4.000000
    endloop
  endfacet
  # Triangle 10: (-2,5,0) (-1,4,3) (3,7,4)
  facet normal -0.092848 0.650000 0.750000 # Placeholder
    outer loop
      vertex -2.000000 5.000000 0.000000
      vertex -1.000000 4.000000 3.000000
      vertex 3.000000 7.000000 4.000000
    endloop
  endfacet

  # Side 4: Connecting (-2,5,0)-(0,0,0) to (-1,4,3)-(1,1,4)
  # Triangle 11: (-2,5,0) (0,0,0) (-1,4,3)
  facet normal -0.707107 -0.070711 0.707107 # Placeholder
    outer loop
      vertex -2.000000 5.000000 0.000000
      vertex 0.000000 0.000000 0.000000
      vertex -1.000000 4.000000 3.000000
    endloop
  endfacet
  # Triangle 12: (0,0,0) (1,1,4) (-1,4,3)
  facet normal -0.707107 -0.070711 0.707107 # Placeholder
    outer loop
      vertex 0.000000 0.000000 0.000000
      vertex 1.000000 1.000000 4.000000
      vertex -1.000000 4.000000 3.000000
    endloop
  endfacet

endsolid irregular_shape
```

[^2]: I am a big fan of being able to do markdown footnotes
