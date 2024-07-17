export const updateDelay = (e, currentItem, type) => {
  let newItem;
  if (type === "fill") {
    newItem = {
      ...currentItem,
      fill: {
        ...currentItem.fill,
        delay: Number(e.target.value),
      },
    };
  } else {
    newItem = { ...currentItem, delay: Number(e.target.value) };
  }
  return newItem;
};
