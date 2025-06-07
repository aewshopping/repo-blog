---
date: 2025-01-21
tags: [javascript]
title: How to use "For loops" to access values in JavaScript object and arrays
---
# How to use "For loops" to access values in JavaScript object and arrays

Looping through an array.
A `for...of loop`

```JavaScript
let mammals = ["dolphin",	"whale",	"manatee",];

// Loop through each mammal
for (let mammal of mammals) {
	console.log(mammal);
}
```

Looping through an object
A `for...in loop`

```JavaScript
const gimli = {
	name: "Gimli",
	race: "dwarf",
	weapon: "battle axe",
};

// Iterate through properties of gimli
for (let key in gimli) {
  console.log(gimli[key]);
}

// Get keys and values of gimli properties
for (let key in gimli) {
  console.log(key.toUpperCase() + ':', gimli[key]);
}
```

Output 1:
```
Gimli 
dwarf
battle
axe
```

Output 2:
```
NAME: Gimli
RACE: dwarf
WEAPON: battle axe
```

The for...in loop is not to be confused with the for...of loop, which is used exclusively on the Array object type.

Test: isArray(mammals) <-- check syntax 

Also for objects

```JavaScript
// Initialize method on gimli object to return property keys
Object.keys(gimli);
```

Output is an array of keys (property names)
`["name", "race", "weapon"]`

https://www.digitalocean.com/community/tutorials/understanding-objects-in-javascript
