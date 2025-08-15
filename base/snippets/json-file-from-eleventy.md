---
title: How to output a json file from a raw json object with eleventy
date: 2025-01-19
tags: [eleventy, nunjucks, javascript]
---
# How to output a json file from a raw json object with eleventy

I wanted to load some data from an API at build time using the eleventy `_data/mydata.js approach`

I then want to output this json directly as a json file, to be referenced later by the website. The solution was:

file name `anything.njk`
```
---
permalink: '/data/quotes.json'
eleventyExcludeFromCollections: true
---

{{ mydata | dump | safe }}
```

The bit that tripped me up was the "pipe safe" at the end. If you just dump the data (which calls JSON.stringify behind the scenes) you see a load of `&quot;`s instead of `"`s.

Messing around with a JavaScript replace function doesn't work at all. `| safe` does!

Bear in mind that this will create a file in the output directory, which will form part of your build / deploy files. 

If you want to (for example) back up some data in the repo you can instead try this, which means the file is not saved in the output directory:

```
---
permalink: 'quotes.json'
eleventyExcludeFromCollections: true
permalinkBypassOutputDir: true
---

{{ mydata | dump | safe }}
```

It is important that the permalink is just a file name with no leading slashes or directories to worry about - putting the file into the root of the repo - otherwise it might not work.

Couple of helpful sources:
- [https://www.trovster.com/blog/2023/09/eleventy-json-output](https://www.trovster.com/blog/2023/09/eleventy-json-output)
- [https://piccalil.li/blog/create-json-feed-eleventy/](https://piccalil.li/blog/create-json-feed-eleventy/)
