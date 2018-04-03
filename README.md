# CIC ScrollLock

Restrict scrolling on elements within a page and optionally prevent all other scrolling

CIC ScrollLock `cic-scroll-lock` is a plain JS class converted from [react-scroll-lock-component](https://github.com/orteth01/react-scroll-lock-component/) with a few custom additions. Use it to lock scrolling on the window/parent that happens on nested or fixed elements.

### Note
The documentation below assumes usage of ES6, but the component will work fine with ES2015 and has been tested for use in IE11 and above.

## Installation
Install the module with npm or yarn
`yarn add castiron/cic-scroll-lock`

## Usage
Include the class in your Javascript and instantiate the class
`import ScrollLock from "cic-scroll-lock"`

Instantiate the class
`const scrollLock = new ScrollLock()`

### Lock Nested Scrolling
Lock a scrolling element on the page such that the parent/window are not scrolled when the boundries of the element are reached.

Note that the user can still manually scroll the parent (or any other scrolling element) by using the mouse wheel while hovering that element, or touch.

(From original react documentation: Wheel events, touchmove events, and key press events that affect page location (e.g. directional arrows, pageup/pagedown/spacebar) are all locked.)
`scrollLock.lock(element)`

Once locked, the same element can be unlocked
`scrollLock.unlock(element)`


### Only scroll one element
Lock a scrolling element on the page such that the user can only scroll that element and no others. Note that this does not prevent the user from scrolling the window with the keyboard (unless inside the nested element).
`scrollLock.only(element)`

Once locked, the effect can be unlocked
`scrollLock.any(element)`

**Note:** Using `only()` completely restricts normal browser behavior and should only be used in special cases where a modal or popup demands focus. It is crucial to unlock scrolling it is crucial to unlock scrolling with `any()` to resume normal behavior when this state is finished.


## Example: Lock nested scrolling of a side bar

### Markup
```
<div class="container">
  <div id="sidebar">
    <!--
      Unlike normal scroll functionality, when the user scrolls this
      div and reaches the beginning or end nothing else on the page should scroll
    -->
  </div>
  <div id="main">
    <!-- Scrolling of this element or window will remain normal -->
  </div>
</div>
```

### Javascript
```
import ScrollLock from "cic-scroll-lock";

const scrollLock = new ScrollLock();
const sidebar = document.getElementById('sidebar');

scrollLock.lock(sidebar);
```

## Example: Lock all scrolling except a modal

### Markup
```
<div class="container">
  <div id="content">
    Donec id elit non mi porta gravida at eget metus.

      <div id="modal">
        <!--
          When showing this element should scroll, but the user should
          not be able to scroll any other element
        -->
      </div>
  </div>
</div>
```

### Javascript
```
import ScrollLock from "cic-scroll-lock";

const scrollLock = new ScrollLock();

// Sample code to open modal that takes a callback
modal.open((modal) => {
  scrollLock.only(modal);
})

// Sample code to close modal that takes a callback
modal.close((modal) => {
  scrollLock.any(modal);
})
```
