export const updateSelector = (e, currentItem, type) => {
  let newItem;
  if (type === "wait") {
    newItem = { wait: e.target.value };
  } else if (type === "fill") {
    newItem = {
      fill: {
        ...currentItem.fill,
        selector: e.target.value,
      },
    };
  } else {
    newItem = { click: e.target.value };
  }
  return newItem;
};
