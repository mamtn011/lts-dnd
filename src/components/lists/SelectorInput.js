import { useItems } from "@/context/ItemContext";
import { findCurrentItemData } from "@/utils/findCurrentItemData";
import { updateSelector } from "@/utils/updateSelector";

const SelectorInput = ({ type, index, selector }) => {
  const { items, changeSelector } = useItems();

  // handle change selector
  const handleSelectorChange = (e) => {
    const { index, currentItem, type } = findCurrentItemData(e, items);
    // update item and set into items
    const updatedItem = updateSelector(e, currentItem, type);
    changeSelector(index, updatedItem);
  };
  return (
    <input
      type="text"
      name="selector"
      value={selector}
      onChange={handleSelectorChange}
      data-id={index}
      className={`w-full p-1 border border-gray-300 rounded ${
        type === "delay" ? "hidden" : ""
      }`}
    />
  );
};

export default SelectorInput;
