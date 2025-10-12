---
title: Adding event listeners in JavaScript - data attribute event delegation
date: 2025-10-10
tags: javascript
---
# Adding event listeners in JavaScript - data attribute event delegation

## What's the point of this?

I was adding an event listener on the DOM and using lots of if statements to figure out which element was clicked - ie if element class list contains "tag" then do this function.

This quickly gets a bit messy so I had a conversation with Gemini AI to find an alternative cleaner pattern. This the result of the conversation, summarised by AI and edited by me, for use by my later self. 

## What is it?

Use `data-action` attributes in the HTML element class names to define the action. Means the styling doesn't get linked to the behaviour through a dual use class. It is a bit like using onClick() in fact! (which I like).

```javascript
//  Map 'data-action' names to their handler functions.
const actionHandlers = {
    'tag-filter': handleTagClick,
    'copy-filename': handleCopyClick,
};

function dataActionDelegate(evt) {
    // Finds the closest element (starting from the target) with the data-action attribute
    const actionElement = evt.target.closest('[data-action]');

    if (actionElement) {
        const actionName = actionElement.dataset.action;
        const handler = actionHandlers[actionName];

        if (handler) {
            handler(evt, actionElement); // Calls the specific handler
        }
    }
}

document.addEventListener('click', dataActionDelegate);
```
Note html would look something like this:

```html
<span class="tag some-tag-name" data-action="tag-filter">Tag Name</span>

<button class="showall" data-action="clear-filters">Show All</button>

<a href="#" class="copythis" data-action="copy-filename" data-copy-attr="file.txt">Copy File</a>
```
## Advantages and disadvantages

### Pros

1. Easy to update: Adding new actions only requires updating the `actionHandlers` map, leaving the main delegation function untouched.

2. Keeps things separate: CSS classes are for styling; data attributes are for behavior.

3. Robust: Uses `closest('[data-action]')` to find the intended action, making it work on a patient even where there are lots of children.

### Cons

1. More HTML Markup: Requires adding a `data-action` attribute to all interactive elements.

2. Need to think about intent: Uses `closest()`, which runs the handler on the element with the attribute closest to the click, so the children always win!

## Explaining some of the underlying code

### A) What is Event.target.closest(selector)?

- `.closest(selector)`:  which exists on all DOM elements, is a method that traverses up the DOM tree, starting at the element itself, until it finds the first ancestor that matches the CSS selector provided (e.g., '.my-button', '[data-action]', 'li').

### B) Using [square-brackets] in the selector

- If the selector is [data-action], it is interpreted by the browser's CSS engine as an Attribute Selector.
- This selector specifically targets any element that possesses an attribute named data-action, regardless of the attribute's value.
- So it could be `data-action="this"` or `data-action="that"`, both would get selected

`const actionElement = evt.target.closest('[data-action]');`

- This line is instructing the browser to find the closest element in the hierarchy that is designated for an action, thereby triggering your delegated event handler.
- It doesn't care which action it is yet (that's handled by reading the value with actionElement.dataset.action), only that it is an element designed to receive a delegated click.

### C) dataset.action explained

`<button data-action="clear-filters">Clear</button>`

| Component                       | Value                                   | Role                                                                              |
| ------------------------------- | --------------------------------------- | --------------------------------------------------------------------------------- |
| 1. actionElement                | The <button> element itself.            | The element found by closest().                                                   |
| 2. actionElement.dataset        | An object: { action: "dothat" }.        | The collection of all data-attributes: `data-something="this" data-action="dothat"`|
| 3. actionElement.dataset.action | "dothat" (a string).                    | Only gets the `data-action` value -  used to look up the correct handler function.|

#### How it works

1. `actionElement`: This is the DOM element returned by evt.target.closest('[data-action]'). It's the element that has the data-action attribute.

2. `.dataset`: This is a read-only property of the HTMLElement interface that provides access to all custom data attributes (data-*) on an element.
  - When the browser encounters an HTML attribute that starts with data-, it automatically collects these into the element's dataset property.

3. `.action`: This is the specific key you are looking up within the dataset object.
  - The property name in JavaScript is created by taking the part of the attribute after data- (which is action) and converting it from kebab-case (data-action) to camelCase (.action).
