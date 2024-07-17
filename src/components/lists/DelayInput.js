import { useItems } from "@/context/ItemContext";
import { findCurrentItemData } from "@/utils/findCurrentItemData";
import { updateDelay } from "@/utils/updateDelay";

const DelayInput = ({ type, index, delay }) => {
  const { items, changeDelay } = useItems();

  // handle change delay
  const handleDelayChange = (e) => {
    const { index, currentItem, type } = findCurrentItemData(e, items);
    // update item and set into items
    const updatedItem = updateDelay(e, currentItem, type);
    changeDelay(index, updatedItem);
  };
  return (
    <input
      type="number"
      name="delay"
      value={delay}
      onChange={handleDelayChange}
      data-id={index}
      className={`w-full p-1 border border-gray-300 rounded ${
        type === "fill" || type === "delay" ? "" : "hidden"
      }`}
    />
  );
};

export default DelayInput;
