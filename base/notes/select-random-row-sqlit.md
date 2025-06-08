---
title: You can select a random row from an sqlite table but there are faster and slower ways to do it
date: 2025-01-14
tags: [sqlite]
---
# You can select a random row from an sqlite table but there are faster and slower ways to do it

According to this page https://stackoverflow.com/questions/2279706/select-random-row-from-a-sqlite-table

```sql
select * from foo where rowid = (abs(random()) % (select (select max(rowid) from foo)+1));
```

seems to be faster (? not totally clear) than:

```sql
SELECT * FROM table ORDER BY RANDOM() LIMIT 1;
```

But anyway try not to count or do an operation that requires scanning all rows... maybe `MAX(rowid)` falls into this trap but is apparently fast than `ORDER BY`...