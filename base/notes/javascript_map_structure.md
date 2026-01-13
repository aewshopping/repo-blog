---
date: 2026-01-13
tags: [javascript]
title: Javascript map data structure, some introductory notes
---

# Javascript map data structure, some introductory notes

To be used as alternative to an array of objects where:

- You want to access those underlying objects easily without iterating over all of them to find the one you want.
- You expect to add and remove objects a lot.

## What is it?

Structurally I think of it as an array of sub-arrays. Something like:

`[ ["id1", "brie"], ["id2", "edam"], ["id3", "gorgonzola"] ]`

However this is just an analogy. The advantage of the map object is that you can access each element directly, without having to iterate over all of them to find the one you want. For example:


```javascript
myMap.get("id3");
// Expected output: gorgonzola
```

## Using a map

You can also easily set, delete, count and clear the map:

```javascript
myMap.set("id4", "cheddar"); // adds a new item

myMap.size; // quicker than counting array

myMap.delete("id3");

myMap.clear(); // delete all items
```

Iterate through the map, or just check a certain id exists:

```javascript
for (const [key, value] of myMap) {
  console.log(`${key}: ${value}`);
}

myMap.has("id2"); // returns true or false
```

Maps are initialised with

`const myMap = new Map();`


## Anything can be a key...

Anything can be a key and anything can be a value in a map.

For example an object can be a key.

An object, or an array can be a value.


## Objects are not stored inside the map (but strings and numbers are)

Objects (and arrays and functions) are not stored inside the map, they are stored elsewhere in memory and the map contains a *reference* to the memory location. They are **stored by reference**.

```javascript
const map = new Map();
const user = { name: "Alice", score: 10 };

// Store the object in the map
map.set("player1", user);

console.log(map.get("player1").score); // Output: 10

// Modify the object directly (outside the map)
user.score = 50;

// The map reflects the change because it points to the same memory location
console.log(map.get("player1").score); // Output: 50
```

In this example you are **mutating** the object - changing it a bit.

However if you were to use the same object variable name (ie `user`) with a new key this would be **reassigning** the variable to a *new* object.

The map would still have the reference to the place in memory where the old object was stored (which now no longer has a variable name assigned).

```javascript
const map = new Map();
let user = { name: "Alice" };
map.set("player1", user);

// REASSIGNMENT: This creates a NEW object in a NEW memory location.
// The Map is still pointing to the OLD "Alice" object.
user = { name: "Bob" }; 

console.log(map.get("player1").name); // Still "Alice"
```

### How simple strings, numbers, booleans (primitives) work in map

"Primitives" (strings, numbers, booleans) are stored by **value** not by **reference** to a memory location.

So if you change a string variable outside of the map, then the map value will change too:

```javascript
let score = 10;
let username = "Alice";

const map = new Map();
map.set("points", score);
map.set("user", username);

// Changing the original variables
score = 50;
username = "Bob";

// The Map remains unchanged
console.log(map.get("points")); // Output: 10
console.log(map.get("user"));   // Output: "Alice"
```

This is how **Objects** (Arrays, Objects, Functions) and **Primitives**(Strings, Numbers, Booleans) work throughout javascript as it happens!

So if you have two maps (or two objects) pointing to the same underlying object and that object gets mutated (ie the value within that object changes) this will affect both of the maps.


