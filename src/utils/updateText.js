export const updateText = (e, currentItem) => {
  let newItem = {
    ...currentItem,
    fill: {
      ...currentItem.fill,
      text: e.target.value,
    },
  };
  return newItem;
};
