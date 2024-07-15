export const findInputsValue = (type, item) => {
  let selector = "";
  let delay = 0;
  let text = "";
  if (type === "wait") {
    selector = item.wait;
  } else if (type === "fill") {
    selector = item.fill.selector || "";
    delay = item.fill.delay || 0;
    text = item.fill.text || "";
  } else if (type === "click") {
    selector = item.click || "";
  } else {
    delay = item.delay || 0;
  }

  return { selector, delay, text };
};
