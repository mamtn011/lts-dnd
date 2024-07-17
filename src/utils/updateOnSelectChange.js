export const updateOnSelectChange = (e, currentInputsValue, id) => {
  let newItem;
  if (e.target.value === "wait") {
    newItem = { id, wait: currentInputsValue.selector };
  } else if (e.target.value === "fill") {
    newItem = {
      id,
      fill: {
        selector: currentInputsValue.selector,
        delay: currentInputsValue.delay,
        text: currentInputsValue.text,
      },
    };
  } else if (e.target.value === "delay") {
    newItem = { id, delay: currentInputsValue.delay };
  } else {
    newItem = { id, click: currentInputsValue.selector };
  }
  return newItem;
};
