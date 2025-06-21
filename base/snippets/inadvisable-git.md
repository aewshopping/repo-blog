---
title: Inadvisable git commands
tags: git 
date: 2025-06-21
---

# Inadvisable git commands

Generally only a good idea for repos that only you work on, and all of them the result of questioning Google Gemini rather than any higher authority...


## Hard reset current environment...

...to equal main, for when I have messed up my codespace by fiddling around with things that I don't understand:

```git
git fetch origin main && git reset --hard origin/main && git clean -df
```

## Restore main to where it was 2 (or any number) commits ago...

...for when you have accepted a breaking Google Jules code update (commit one) and then the subsequent Jules repair code update (commit two) has failed:

```git
git reset --hard HEAD~2
```

 * __HEAD~2__: This points to the commit two commits before your current HEAD.
What git reset --hard does:
 * __Rewrites history__: All commits after HEAD~2 will be removed from your current branch's history. These commits will become "dangling" and eventually garbage-collected unless another branch references them.
 * __Discards changes__: Your working directory and staging area will be completely reset to the state of HEAD~2. Any uncommitted changes or files that were part of the removed commits will be lost.


## Force push to main...

...for when there is some sort of merge conflict that I would need to have some rudimentary understating of git to resolve:

```git
git push --force origin main
```
