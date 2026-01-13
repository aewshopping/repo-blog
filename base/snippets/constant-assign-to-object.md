---
title: What constant does when assigned to an object in javascript
tags: javascript
date: 2026-01-13
---
# What const does when assigned to an object in javascript

There is a common misconception that "const" prevents an object from being changed.

Const [object] only prevents you from reassigning the variable object name to a different object.

It does not prevent you from changing (mutating) the properties or nested objects inside of it.

For example:

```javascript
const map = new Map();

// A nested object structure
const player = {
  id: 1,
  stats: {
    health: 100,
    level: 5
  }
};

// Store the top-level object in the map
map.set("p1", player);

// 1. Modify the inner object directly
player.stats.health = 45;

// 2. The Map reflects this change because it's following the reference chain AND the const assignment doesn't prevent changes to values
console.log(map.get("p1").stats.health); // Output: 45
```
