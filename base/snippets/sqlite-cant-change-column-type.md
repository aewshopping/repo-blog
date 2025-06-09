---
title: You can't change the type of a column in sqlite, you have to create a new table with the column type you want and copy it across
date: 2025-01-09
tags: [sqlite]
---
# You can't change the type of a column in sqlite, you have to create a new table with the column type you want and copy it across

You can't change the type of a column in sqlite, you have to create a new table with the column type you want and copy it across.

This is because the table schema is stored as plain text rather than a new table in order to save disk space. 

https://www.sqlite.org/lang_altertable.html#altertabmvcol:~:text=changes%20to%20the%20format%20of%20a%20table%20using%20a%20simple%20sequence%20of%20operations

Other implementations of sql don't have this constraint because the schema is saved as a new table.