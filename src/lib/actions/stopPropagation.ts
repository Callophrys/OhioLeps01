export function stopPropagation(node: any) {
  function stop(event: any) {
    event.stopPropagation();
  }

  const events = ["toggle", "click", "keypress", "keyup", "keydown"];
  events.forEach((event) => node.addEventListener(event, stop));

  return {
    destroy() {
      events.forEach((event) => node.removeEventListener(event, stop));
    },
  };
}
