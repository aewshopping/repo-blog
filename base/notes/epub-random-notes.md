---
title: Random epub notes
tag: [epub]
date: 2025-09-12
---
# Random epub notes

## Random epub format learning

- You can look inside an `epub` file by adding `.zip` to the end. There are a bunch of files and folders in there.
- But you can't zip it up again with normal zipping, because the files need to be zipped in a certain order, with the manifest first (or last?), uncompressed. 
- The easiest way I know of creating and editing an ebook such as epub is with `Calibre` - open source software to run on your machine.
- There are two `table of content` or `toc` files inside the epub folder (if you create with Calibre). One is for epub version 2. The other is for epub version 3.
- epub 3 allows for multimedia things such as audio and video. Also scripting with JavaScript I believe. epub 2 is static only: html and CSS - I understand. 
- advice is to use epub2 unless you know you need epub3. This is for broadest compatibility. 
- Each chapter in an epub is a separate html file. Same with sub chapters.
- If you want to change your chapters to sub chapters manually you need to edit one of the `toc` files so that the `<li>` has a sub `<ol>` with the subchapters listed and referenced, each as it's own `<li>`. 
- calibre can create subchapters for you when converting to epub, based on `h2` for example, so you don't really need to do this manually, unless creating your epub elsewhere, with less flexible software.
- It is tricky to correctly embed an emoji into an epub book. Should be possible but looks like a faff. It seems to be impossible in Amazon ebook format. (I mean as a font not as an embedded image.)
- Calibre can't remember your epub conversion settings very well - just whatever you did last time. This is a bit of a pain.
- Two options: 
  - If you are creating from your own published html page as I was you could figure out the calibre `recipe` that achieves this and save the recipe.
  - Or you could create a little bash or powershell script that can run from the Calibre folder, with your options set out as command line instructions. I presume this works but haven't yet tried it - I'm relying on google gemini here. 
  - You can see the list of instructions on each ebook conversion by looking at the `jobs` run by Calibre and inspecting the log or record or whatever it is. This will help you with the bash script options above. 

## Random Amazon ebook publishing learnings

- If you publish an ebook on Amazon and download it, this is _probably_ the version you will get forever. 
- Even if you subsequently correct errors and re upload.
  - I say probably because on my kindle paperwhite it automatically updated to the new version of the book.
  - But on my Kindle android app the same book did not update (even though `Book Updates` is set to `Automatic`)
- Basically you should correct all your mistakes first time round `:-)`