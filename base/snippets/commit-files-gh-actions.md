---
title: How to commit files in GitHub actions
tags: github-actions
date: 2025-06-10
---
# How to commit files in GitHub actions

I copied this approach from Simon Willison's [Scottish rail announcements repo](https://github.com/simonw/scotrail-datasette)

The last bit of one of the workflows looks like this: 

```yaml
      - name: Commit and push
        run: |-
          git config user.name "Automated"
          git config user.email "actions@users.noreply.github.com"
          git add --all
          timestamp=$(date --utc)
          git commit --message "${timestamp}" || exit 0
          git pull --rebase
          git push
```

I like it because it is short and understandable!

- I expanded -A to --all
- also -u to --utc
- and -m to --message

If it doesn't work the error will be in one of those three being wrong!
