---
title: SQLite is loosely typed ie pretty much any type of data can go in any column
date: 2025-01-08
tags: [sqlite]
---
# SQLite is loosely typed ie pretty much any type of data can go in any column

This is by design... https://www.sqlite.org/flextypegood.html

Types are:

- `NULL`. The value is a NULL value.
- `INTEGER`. The value is a signed integer, stored in 0, 1, 2, 3, 4, 6, or 8 bytes depending on the magnitude of the value.
- `REAL`. The value is a floating point value, stored as an 8-byte IEEE floating point number.
- `TEXT`. The value is a text string, stored using the database encoding (UTF-8, UTF-16BE or UTF-16LE).
- `BLOB`. The value is a blob of data, stored exactly as it was input. ie could be used for files

See this link for more info
https://www.sqlite.org/datatype3.html#:~:text=NULL.%20The%20value,it%20was%20input.