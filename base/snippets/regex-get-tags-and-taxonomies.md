---
date: 2025-01-21
tags: regex
title: How to use regex to capture tags and taxonomies
---
String like `#parent/child`

Or just `#orhpan` I want to capture the children and orphans and link the parents and the children together 

Regex patterns: 

#### 1. Represents a forward slash in regex
```regex
\/
```


#### 2. For parent capture only
(for use in taxonomy replace (increases transparency))
```regex
#(\w+)\/
```


#### 3. Two capture groups, tag OR child in tag hierarchy, excludes #
(for use in class names)
```regex
#(\w+)(?!.*\/)|\/(\w+) 
```


#### 4. Two capture groups, tag OR child in tag hierarchy, includes #
(for use in tag replace)
```regex
(#\w+)(?!.*\/)|\/(\w+) 
```


#### 5. Parent and child capture
(for use in establishing parent child relationships)
```regex
#(\w+)\/(\w+)
```
