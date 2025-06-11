---
title: How to create a date filter in eleventy
tags: eleventy
date: 2025-06-11
---
# How to create a date filter in eleventy

This is to get your dates written nicely, without timestamps and so forth. I want a clean Day Month Year format.

In the `eleventy.config.js` file (or naming variant thereof) add:

```javascript
import { DateTime } from "luxon";

export default async function(eleventyConfig) {
	
    eleventyConfig.addFilter("myDate", dateObj => {
      return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("d LLLL yyyy");
    });

};
```

luxon is a dependency of eleventy so you don't need to add it to `package.json`.

Now myDate can be used as a piped filter in your text. For example: 

```nunjucks
{{ post.page.date | myDate }}
```

Credit here to https://11ty.rocks/eleventyjs/dates/
