export const updateText = (e, currentItem) => {
  let newItem = {
    fill: {
      ...currentItem.fill,
      text: e.target.value,
    },
  };
  return newItem;
};
