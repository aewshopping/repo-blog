---
title: You can't change column names in a table in SQLite unless you have version greater than 3.25.0
date: 2025-01-09
tags: [sqlite]
---
# You can't change column names in a table in SQLite unless you have version greater than 3.25.0.

https://stackoverflow.com/questions/805363/how-do-i-rename-a-column-in-an-sqlite-database-table#:~:text=as%20of%20version%203.25.0%20released%20September%202018%20you%20can%20now%20use%20ALTER%20TABLE%20to%20rename%20a%20column

Glitch (now closed as of July 2025) indicates in the package.json that you have sqlite v 5.something but checking in the terminal (sqlite3 --version - ?) shows it is actually v 3.0someting.

This is because the OS underlying glitch can't cope with a higher version number of sqlite, and can't be updated by the user. It is the Glibc version that is the problem apparently.

https://support.glitch.com/t/sqlite3-and-glibc-error/61240 (note that the fix in this chat doesn't work.