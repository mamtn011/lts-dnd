export const updateOnSelectChange = (e, currentInputsValue) => {
  let newItem;
  if (e.target.value === "wait") {
    newItem = { wait: currentInputsValue.selector };
  } else if (e.target.value === "fill") {
    newItem = {
      fill: {
        selector: currentInputsValue.selector,
        delay: currentInputsValue.delay,
        text: currentInputsValue.text,
      },
    };
  } else if (e.target.value === "delay") {
    newItem = { delay: currentInputsValue.delay };
  } else {
    newItem = { click: currentInputsValue.selector };
  }
  return newItem;
};
