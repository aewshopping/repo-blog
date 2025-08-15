---
title: Using secrets in GitHub codespaces
date: 2025-08-15
tags: GitHub codespaces
---
# Using secrets in GitHub codespaces

First you need to navigate to your repo, go to settings, then security or secrets, then the codespaces section. 

Add your secret, for example a secret called `SECRET`.

When in the terminal, inside codespaces you can either access it directly with: 

```
echo $SECRET
```

Or if you need to refer to it in the code itself it would be something like: 

```
const mySecret = process.env.SECRET
```

Note that you don't need to npm install `dotenv` as this works 'out of the box' with codespaces.
