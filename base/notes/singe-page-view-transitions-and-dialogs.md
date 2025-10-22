---
tags: javascript
title: Single page view transitions and dialogs
date: 2025.10.21
---
# Single page view transitions and dialogs 

I wanted to use single page view transitions to transition a modal on to the screen.

The modal imitates the behaviour of Google Keep where you click on a note / file and the note expands from current position to the file content view. 

At the time of writing I couldn't find anything online that addressed this use case directly. Probably for this reason AI advice was also often wrong.

I _initially_ thought that you would have to make the modal dialog move around, first on the position of the note, then onto the central reading position, then animate between the two. 

Actually it can be achieved much more simply thusly:

## Overall javascript process 

- click the note 
- apply a class to the note with the property `view-transition-name: moving-dialog `
- this creates the first 'snapshot'
- run the `document.startViewTransition` function
- within this function:
  - remove the class with `view-transition-name: moving-dialog` in it from the note 
  - apply the same class with `view-transition-name: moving-dialog` in it to the modal
  - this creates the second 'snapshot'.
- that's it! You can then rely on the view transitions stuff to animate from snapshot one to snapshot two.

The JavaScript example below shows this in action.

Note I have a child element of the dialog which I am moving called here `movingbox`. This is because I found moving the dialog element around directly was very glitchy. 

```javascript
let file_box; // so we can access the target on close modal too

function handleOpenFileContent(event, target) {
  file_box = target;

  file_box.classList.add("moving-file-content-view"); // animate *from* this element
  dialog.showModal();

  // 3. Animate the move (State 1 -> State 2)
  document.startViewTransition(function () {

    dialog.classList.add("dialog-view"); // backdrop fade in
    movingbox.classList.add("moving-file-content-view");  // animate *to* this file target element
    file_box.classList.remove("moving-file-content-view");

    loadContentModal(); // my function to load content to dialog
  });
}
```


## CSS to control the animation

You can target the view transition in CSS like this: 

```css
::view-transition-group(moving-box-element) {
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
}

::view-transition-new(moving-box-element),
::view-transition-old(moving-box-element) {
  animation-duration: 0.5s; /* makes content switch over more quickly if shorter than group duration */
}

/* by applying class first to target element then to modal we can animate from one to the other - controlled by javascript */
.moving-file-content-view {
  view-transition-name: moving-box-element;
}

/* also css applied to the modal to position wherever you like? */
```

- You don't _need_ to target the pseudo elements with css, but it is handy to control animation speed and shape.
- The `view-transition-old(thing)` will target snapshot one. 
- The `view-transition-new(thing)` will target snapshot one.

## Closing the modal with animating back to previous position

Closing the modal needs an extra step so that the modal doesn't just close straight away before the view transition has occurred. 

- create a variable for the `document.startViewTransition `.
- when this transition variable has 'finished' (ie view transition all done) you can then close the modal!

```JavaScript
function handleCloseModal() {

  movingbox.classList.add("moving-file-content-view"); // make sure animating **from** modal view

  const transition = document.startViewTransition(function () {

    dialog.classList.remove("dialog-view"); // backdrop fade out
    movingbox.classList.remove("moving-file-content-view");
    file_box.classList.add("moving-file-content-view"); // animating **back to** file target view

  });

  transition.finished.then(() => {
    dialog.close();
    file_box.classList.remove("moving-file-content-view"); // make sure everything removed ready for next time
    movingbox.classList.remove("moving-file-content-view"); // make sure everything removed ready for next time
  });

}
```

## View transition gotchas

- Specifying when to add and remove the class for the 'from' and 'to' element was a bit tricky for me for some reason, and it took me a while to get it right.
- Trying to position the dialog itself was very sketchy. Having a child element of the dialog and positioning this element was much more predictable. Not sure why.

### Aspect ratio change
- Because the 'from' shape and the 'to' shape had different aspect ratios, this made the animation wonky. I needed to add a bit of css to this as per below to allow a smooth shape change:

```css
::view-transition-new(moving-box-element),
::view-transition-old(moving-box-element) {
  opacity: 1; /* allegedly needed for smooth transition but don't see it myself */
  transform: none; /* allegedly needed for smooth transition but don't see it myself */
  height: 100%; /* to make sure size doesn't jump when aspect ratio changes */
  width: 100%; /* to make sure size doesn't jump when aspect ratio changes */ 
  animation-duration: calc(
    0.7s / var(--file-content-transition-speed)
  ); /* makes content switch over more quickly if shorter than group duration */
}
```

### Hiding elements explicitly

- To avoid elements flashing up at the end of beginning of animations I also needed apply a 'hider' class. View transition didn't quite work as I would have expected here but it was relatively simple to correct for this - pop in the `opacity:0` class (or alternatively `display:hidden` class) whenever you definitely shouldn't see the dialog!
- Transitioning the backdrop of the modal was extremely fiddly to figure out although in the end the solution that I landed on was pretty compact.
- The problem I found was that I could either transition _in_, or transition _out_ the backdrop with a fade, but I struggled to make both work. 
- Anyway here is what I did

```css
/* "from" state */
dialog::backdrop {
  background: transparent;
}
.dialog-view {
  view-transition-name: dialog-backdrop;
}
/* "to" state */
.dialog-view::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}
/* to target backdrop, not sure why can't target any other way... works on both fade in and out! */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: calc(2s / var(--file-content-transition-speed));
  animation-timing-function: ease-in-out;
}
```

The JavaScript is then easy enought to integrate with the rest of the view transition (also showing with `opacity-0` class as mentioned above): 

```JavaScript
function handleOpenFileContent(event, target) {
  file_box = target;
  movingbox.classList.add("opacity-0"); // so it doesn't flash up on first open

  file_box.classList.add("moving-file-content-view"); // animate *from* this element
  dialog.showModal();

  // 3. Animate the move (State 1 -> State 2)
  document.startViewTransition(function () {

    dialog.classList.add("dialog-view"); ////// BACKDROP FADE IN! ////// 
    movingbox.classList.add("moving-file-content-view");  // animate *to* this file target element
    movingbox.classList.remove("opacity-0"); // so you can now see it
    file_box.classList.remove("moving-file-content-view");

    loadContentModal();
  });
}
```

And for the close function:

```javascript
function handleCloseModal() {

  movingbox.classList.add("moving-file-content-view"); // make sure animating **from** modal view
  movingbox.classList.remove("opacity-0"); // and you can see it

  const transition = document.startViewTransition(function () {

    dialog.classList.remove("dialog-view"); ////// BACKDROP FADE OUT! ////// 
    movingbox.classList.remove("moving-file-content-view");
    file_box.classList.add("moving-file-content-view"); // animating **back to** file target view
    movingbox.classList.add("opacity-0"); // hide modal otherwise it stays onscreen during animation

  });

  transition.finished.then(() => {
    dialog.close();
    file_box.classList.remove("moving-file-content-view"); // make sure everything removed ready for next time
    movingbox.classList.remove("moving-file-content-view"); // make sure everything removed ready for next time
  });

}
```

## Close dialog when clicking on background

As a final bonus, here is how I am handling the close modal, when the backdrop is clicked.

Stretch the dialog to fill the screen with css (remember it is the child of the dialog that is moving around not the dialog itself).

```css
#file-content-modal {
  /* Remove default centering and ensure it covers the viewport for correct positioning */
  position: fixed;
  border: none;
  margin: 0px;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100vw;
  background: transparent;
}
```
Apply an on click event handler to the dialog.

Link this to this js function:

```javascript
// to allow click outside the modal to close with animation (closedby="any" on html element triggers immediate close)
export function handeCloseModalOutside(event, target) {

  if (event.target === dialog) {
    handleCloseModal();
  }
}
```
This then integrates nicely with the close function above.

I didn't use `closedby="any"` on the dialog html markup because I couldn't get the to co-ordinate with the view transition. Maybe there is a way? Anyway the method here worked for me and doesn't seem too heavy handed.
