export const findCurrentItemData = (e, items) => {
  const index = Number(e.target.dataset.id);
  const currentItem = items[index];
  const type = Object.keys(currentItem)[1];
  return { index, currentItem, type };
};
