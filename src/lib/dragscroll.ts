/**
 * @fileoverview dragscroll - scroll area by dragging
 * @version 0.0.8
 *
 * @license MIT, see http://github.com/asvd/dragscroll
 * @copyright 2015 asvd <heliosframework@gmail.com>
 */

interface DragscrollElement extends HTMLElement {
  container?: HTMLElement;
  scroller?: HTMLElement;
  md?: (e: MouseEvent) => void;
  mu?: () => void;
  mm?: (e: MouseEvent) => void;
}

interface Dragscroll {
  reset: () => void;
}

(function (root: Window, factory: (exports: Dragscroll) => void) {
  if (typeof customElements.define === "function") {
    customElements.define("exports", factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    factory((root.dragscroll = {}));
  }
})(this, function (exports: Dragscroll) {
  const _window: Window = window;
  const _document: Document = document;
  const mousemove: string = "mousemove";
  const mouseup: string = "mouseup";
  const mousedown: string = "mousedown";
  const EventListener: string = "EventListener";
  const addEventListener: string = "add" + EventListener;
  const removeEventListener: string = "remove" + EventListener;
  let newScrollX: number, newScrollY: number;

  let dragged: DragscrollElement[] = [];

  const reset = function (i?: number, el?: DragscrollElement): void {
    for (i = 0; i < dragged.length; ) {
      el = dragged[i++];
      el = el.container || el;
      el[removeEventListener](mousedown, el.md!, 0);
      _window[removeEventListener](mouseup, el.mu!, 0);
      _window[removeEventListener](mousemove, el.mm!, 0);
    }

    // cloning into array since HTMLCollection is updated dynamically
    dragged = [].slice.call(_document.getElementsByClassName("dragscroll"));
    for (i = 0; i < dragged.length; ) {
      (function (
        el: DragscrollElement,
        lastClientX: number,
        lastClientY: number,
        pushed: number,
        scroller: HTMLElement,
        cont: HTMLElement,
      ) {
        (cont = el.container || el)[addEventListener](
          mousedown,
          (cont.md = function (e: MouseEvent) {
            if (
              !el.hasAttribute("nochilddrag") ||
              _document.elementFromPoint(e.pageX, e.pageY) == cont
            ) {
              pushed = 1;
              lastClientX = e.clientX;
              lastClientY = e.clientY;

              e.preventDefault();
            }
          }),
          0,
        );

        _window[addEventListener](
          mouseup,
          (cont.mu = function () {
            pushed = 0;
          }),
          0,
        );

        _window[addEventListener](
          mousemove,
          (cont.mm = function (e: MouseEvent) {
            if (pushed) {
              (scroller = el.scroller || el).scrollLeft -= newScrollX =
                -lastClientX + (lastClientX = e.clientX);
              scroller.scrollTop -= newScrollY =
                -lastClientY + (lastClientY = e.clientY);
              if (el == _document.body) {
                (scroller = _document.documentElement).scrollLeft -= newScrollX;
                scroller.scrollTop -= newScrollY;
              }
            }
          }),
          0,
        );
      })(dragged[i++]);
    }
  };

  if (_document.readyState == "complete") {
    reset();
  } else {
    _window[addEventListener]("load", reset, 0);
  }

  exports.reset = reset;
});
