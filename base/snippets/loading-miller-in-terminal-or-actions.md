---
title: Loading Miller in github actions or codespaces terminal
tags: miller, github-actions
date: 2025-06-05
---
Like this:
```
wget --quiet https://github.com/johnkerl/miller/releases/download/v6.10.0/miller-6.10.0-linux-amd64.tar.gz
tar --extract --gzip --file miller-6.10.0-linux-amd64.tar.gz
sudo mv miller-6.10.0-linux-amd64/mlr /usr/local/bin/
```
Noting you can do this programatically for different versions

Or one by one for ease for `CTRL+C`:

Line 1:
```
wget --quiet https://github.com/johnkerl/miller/releases/download/v6.10.0/miller-6.10.0-linux-amd64.tar.gz
```

Line 2:
```
tar --extract --gzip --file miller-6.10.0-linux-amd64.tar.gz
```

Line 3:
```
sudo mv miller-6.10.0-linux-amd64/mlr /usr/local/bin/
```
