import { pxToNumber } from "./sizing.js";
import { calcComputedStyle } from "./styling.js";
/**
 * A legacy-typed safer version of `element.getBoundingClientRect()`,
 *  that also invites minification capabilities (muliply calls can be forward to here, and it's pure).
 * */
export const getElementRect = (element) =>
  /*@__PURE__*/ element.getBoundingClientRect();
export const getBordersSizeOffsets = (computedStyle, calcEnds = true) => {
  if (computedStyle.getPropertyValue("box-sizing") === "border-box") {
    // In this case, no offset is needed since the box model of this element doesn't include the border.
    return undefined;
  }
  // otherwise
  const left = pxToNumber(computedStyle.getPropertyValue("border-left-width"));
  if (left === undefined) {
    console.error(
      "Splitpanes Error: Fail to parse container `border-left-width`.",
    );
    return undefined;
  }
  // otherwise
  const top = pxToNumber(computedStyle.getPropertyValue("border-top-width"));
  if (top === undefined) {
    console.error(
      "Splitpanes Error: Fail to parse container `border-top-width`.",
    );
    return undefined;
  }
  // otherwise
  const result = { left, top };
  if (calcEnds) {
    const right = pxToNumber(
      computedStyle.getPropertyValue("border-right-width"),
    );
    if (right === undefined) {
      console.error(
        "Splitpanes Error: Fail to parse container `border-right-width`.",
      );
      return undefined;
    }
    // otherwise
    const bottom = pxToNumber(
      computedStyle.getPropertyValue("border-bottom-width"),
    );
    if (bottom === undefined) {
      console.error(
        "Splitpanes Error: Fail to parse container `border-bottom-width`.",
      );
      return undefined;
    }
    // otherwise
    const resultExtended = result;
    resultExtended.right = right;
    resultExtended.bottom = bottom;
  }
  return result;
};
/**
 * Computes the position and the dimensions of the element without the border.
 *
 * While `element.getBoundingClientRect()` gives the correct size with the borders, this method method does include the borders.
 *
 * Notice that for calculating the width and the height without the border, we must use this function instead of using
 *  `Element.clientWidth` and `Element.clientHeight`, beacuse they round the sizes of the pixels to be integer.
 */
export function elementRectWithoutBorder(element, computedStyle) {
  if (!computedStyle) {
    computedStyle = calcComputedStyle(element);
  }
  const rect = getElementRect(element);
  const borderOffsets = getBordersSizeOffsets(computedStyle, true) || {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  };
  return {
    width: rect.width - borderOffsets.left - borderOffsets.right,
    height: rect.height - borderOffsets.top - borderOffsets.bottom,
    left: rect.left + borderOffsets.left,
    top: rect.top + borderOffsets.top,
  };
}
/** Get the cursor position relative to some element. */
export const positionDiff = (to, from) => ({
  left: to.left - from.left,
  top: to.top - from.top,
});
export function getGlobalMousePosition(event) {
  const eventMouse = event;
  const eventTouch = event;
  const { clientX, clientY } =
    "ontouchstart" in window && eventTouch.touches
      ? eventTouch.touches[0]
      : eventMouse;
  return { left: clientX, top: clientY };
}
