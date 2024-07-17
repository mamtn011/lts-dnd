export const updateSelector = (e, currentItem, type) => {
  let newItem;
  if (type === "wait") {
    newItem = { ...currentItem, wait: e.target.value };
  } else if (type === "fill") {
    newItem = {
      ...currentItem,
      fill: {
        ...currentItem.fill,
        selector: e.target.value,
      },
    };
  } else {
    newItem = { ...currentItem, click: e.target.value };
  }
  return newItem;
};
