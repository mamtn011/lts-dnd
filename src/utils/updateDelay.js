export const updateDelay = (e, currentItem, type) => {
  let newItem;
  if (type === "fill") {
    newItem = {
      fill: {
        ...currentItem.fill,
        delay: Number(e.target.value),
      },
    };
  } else {
    newItem = { delay: Number(e.target.value) };
  }
  return newItem;
};
