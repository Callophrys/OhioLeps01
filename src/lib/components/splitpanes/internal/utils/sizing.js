export function pxToNumber(pxString) {
  if (!pxString?.endsWith("px")) {
    return undefined;
  }
  // otherwise
  const num = parseFloat(pxString.slice(0, pxString.length - 2));
  return isNaN(num) ? undefined : num;
}
export const getDimensionName = (horizontal) =>
  horizontal ? "height" : "width";
