---
title: How to output a json file from a raw json object with eleventy
date: 2025-01-19
tags: [eleventy, nunjucks, javascript]
---
# How to output a json file from a raw json object with eleventy

I wanted to load some data from an API at build time using the eleventy `_data/mydata.js approach`

I then want to output this json directly as a json file, to be referenced later by the website. The solution was:

```yaml
/
permalink: '/data/quotes.json'
eleventyExcludeFromCollections: true
/

{{ mydata | dump | safe }}
```

The bit that tripped me up was the "pipe safe" at the end. If you just dump the data (which calls JSON.stringify behind the scenes) you see a load of `&quot;`s instead of `"`s.

Messing around with a JavaScript replace function doesn't work at all. `| safe` does!

Couple of helpful sources:
- [https://www.trovster.com/blog/2023/09/eleventy-json-output](https://www.trovster.com/blog/2023/09/eleventy-json-output)
- [https://piccalil.li/blog/create-json-feed-eleventy/](https://piccalil.li/blog/create-json-feed-eleventy/)
