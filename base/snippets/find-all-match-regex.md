---
title: How to find all instances of match pattern in regex using JavaScript
date: 2025-01-20
tags: [regex, javascript]
---
# How to find all instances of match pattern in regex using JavaScript

Using `myString.matchAll(regex)`

Where myString is the text to search and regex is the regex pattern you are trying to match.

`matchAll` has some advantages over the older 'match' method which I believe are: 

- will return all matching groups ie matches and capture groups. Match is just the immediate regex match.
- it also seems to return the entire string that was searched which is a bit odd 
- plus some other info
- I think it returns an object rather than an array, so output may need some fiddling with
