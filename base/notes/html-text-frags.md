---
title: Links with text fragments can link to specific text on a webpage
date: 2025-01-13
tags: [html, javascript]
---
# Links with text fragments can link to specific text on a webpage

Text fragments link to some specified text in a webpage. https://developer.mozilla.org/en-US/docs/Web/URI/Fragment/Text_fragments

Good write up here https://alfy.blog/2024/10/19/linking-directly-to-web-page-content.html.

Trying to implement in javascript dynamically had one gotcha which is that you need to split the text frag into words not characters as partial words confuse the browser as they look a bit like uri encoding...

(Partial words can occur if you use a fixed character length string to get the first x characters of a block of text - the last word is likely to be truncated a word cut in two by the end of a string.)

Also, for some reason they don't always get executed properly in the browser for eg I had to put a target="_blank" in my <a> link for it work (ie opening in same window didn't work) and it didn't always scroll to exactly the right place. But degrades gracefully.

from https://codepen.io/anthony_zero/pen/yyBjLaK

```JavaScript
let URLSTEM =
  "https://popularhistorybooks.com/posts/reviews/2024-12-22-review-the-invention-of-good-and-evil/";
const TEXTFRAG =
  "...seats would be demolished, windows shattered; there’d be pools of blood on the carpet, torn ears, fingers and penises, countless dead apes throughout the plane, and great howling and gnashing of teeth.";

function getFirstWords(str, num) {
  return str.split(" ").slice(0, num).join(" ");
}
function getLastWords(str, num) {
  return str.split(" ").slice(-num).join(" ");
}

function createTextFragURL(urlstem, textfrag) {
   //seems like if you try to use part words this causes problems with the uri encoding. Therefore you could encode the whole text fragment as long as you know that it isn't too long... Better to use a "first / last n words" function as per below
  
  let textfragLEFT = encodeURIComponent(getFirstWords(textfrag, 3));
  let textfragRIGHT = encodeURIComponent(getLastWords(textfrag, 3));
  let textfragSEARCH = `${textfragLEFT},${textfragRIGHT}`;

  // check url has forward slash on the end and add if not
  if (urlstem.slice(-1) != "/") {
    urlstem += "/";
  }

  return `${urlstem}#:~:text=${textfragSEARCH}`;
}

function createLink() {

  let hreflink = createTextFragURL(URLSTEM, TEXTFRAG);

  let myLink = document.getElementById("myLink");
  myLink.href = hreflink;
  myLink.innerText = hreflink;
}
```