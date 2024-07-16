import { useItems } from "@/context/ItemContext";
import { findCurrentItemData } from "@/utils/findCurrentItemData";
import { findInputsValue } from "@/utils/findInputValues";
import { updateDelay } from "@/utils/updateDelay";
import { updateOnSelectChange } from "@/utils/updateOnSelectChange";
import { updateSelector } from "@/utils/updateSelector";
import { updateText } from "@/utils/updateText";
import BarIcon from "../icons/BarIcon";

const Item = ({ item, index }) => {
  const {
    items,
    cloneItem,
    deleteItem,
    changeItemType,
    changeSelector,
    changeText,
    changeDelay,
  } = useItems();

  const type = Object.keys(item)[0];
  const { selector, text, delay } = findInputsValue(type, item);

  // handle clone item
  const handleCloneItem = (e) => {
    const { index, currentItem } = findCurrentItemData(e, items);
    cloneItem(index, currentItem);
  };

  // handle delete item
  const handleDeleteItem = (e) => {
    const { index } = findCurrentItemData(e, items);
    deleteItem(index);
  };
  // handle change item type
  const handleTypeChange = (e) => {
    // find target item and get its prev value
    const { index, currentItem, type } = findCurrentItemData(e, items);
    const currentInputsValue = findInputsValue(type, currentItem);
    // update item and set into items
    const updatedItem = updateOnSelectChange(e, currentInputsValue);
    changeItemType(index, updatedItem);
  };
  // handle change selector
  const handleSelectorChange = (e) => {
    const { index, currentItem, type } = findCurrentItemData(e, items);
    // update item and set into items
    const updatedItem = updateSelector(e, currentItem, type);
    changeSelector(index, updatedItem);
  };
  // handle change text
  const handleTextChange = (e) => {
    const { index, currentItem } = findCurrentItemData(e, items);
    // update item and set into items
    const updatedItem = updateText(e, currentItem);
    changeText(index, updatedItem);
  };
  // handle change delay
  const handleDelayChange = (e) => {
    const { index, currentItem, type } = findCurrentItemData(e, items);
    // update item and set into items
    const updatedItem = updateDelay(e, currentItem, type);
    changeDelay(index, updatedItem);
  };

  return (
    <li key={index} className="p-1 border border-gray-400 rounded flex gap-1">
      <button>
        <BarIcon />
      </button>
      <select
        name="list-name"
        id="list-type"
        value={type}
        data-id={index}
        onChange={handleTypeChange}
        className="p-1 border border-gray-300 rounded"
      >
        <option value="wait">Wait</option>
        <option value="fill">Fill</option>
        <option value="delay">Delay</option>
        <option value="click">Click</option>
      </select>
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
      <input
        type="text"
        name="text"
        value={text}
        onChange={handleTextChange}
        data-id={index}
        className={`w-full p-1 border border-gray-300 rounded ${
          type === "fill" ? "" : "hidden"
        }`}
      />
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
    </li>
  );
};

export default Item;
