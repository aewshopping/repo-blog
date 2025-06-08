---
title: csv files cannot contain line breaks in a field entry
date: 2025-01-10
tags: [csv, tsv]
---
# csv files cannot contain line breaks in a field entry

I had some cells with line breaks in them in google sheets. I exported as csv and tsv. Importing into sqlite the linebreaks within the cells were gone.

Issue is that csv can __never__ have line breaks within a cell, because line breaks always denote new lines for new rows of data.

Workaround would be to sub in some placeholder symbol while converting to csv, then while importing to sqlite convert back to new line (ie something like \n) 