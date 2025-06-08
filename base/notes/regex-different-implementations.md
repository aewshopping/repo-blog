---
title: Regex is implemented differently in different contexts
date: 2025-01-11
tags: [regex, airtable]
---
# Regex is implemented differently in different contexts

RegEx has different implementations in different contexts. Most languages don't implement the full set of features.

Trying to get RegEx to work on Airtable was a challenge. Turns out that they use the `Golang` implementation (I think).

You can test what works in https://RegEx101.com and selecting `GoLang`.