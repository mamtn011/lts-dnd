import { useItems } from "@/context/ItemContext";
import { findCurrentItemData } from "@/utils/findCurrentItemData";

const CloneDelete = ({ index }) => {
  const { items, cloneItem, deleteItem } = useItems();
  // handle clone item
  const handleCloneItem = (e) => {
    const { index, currentItem } = findCurrentItemData(e, items);
    const newItem = {
      ...currentItem,
      id: Date.now(),
    };
    cloneItem(index, newItem);
  };

  // handle delete item
  const handleDeleteItem = (e) => {
    const { index } = findCurrentItemData(e, items);
    deleteItem(index);
  };
  return (
    <>
      <button
        onClick={handleCloneItem}
        data-id={index}
        className="p-1 border border-gray-300 rounded"
      >
        Clone
      </button>
      <button
        onClick={handleDeleteItem}
        data-id={index}
        className="px-2 py-1 border border-gray-300 rounded"
      >
        x
      </button>
    </>
  );
};

export default CloneDelete;
