import { useItems } from "@/context/ItemContext";
import { findCurrentItemData } from "@/utils/findCurrentItemData";
import { findInputsValue } from "@/utils/findInputValues";
import { updateOnSelectChange } from "@/utils/updateOnSelectChange";

const SelectType = ({ type, index }) => {
  const { items, changeItemType } = useItems();
  // handle change item type
  const handleTypeChange = (e) => {
    // find target item and get its prev value
    const { index, currentItem, type } = findCurrentItemData(e, items);
    const currentInputsValue = findInputsValue(type, currentItem);
    // update item and set into items
    const updatedItem = updateOnSelectChange(
      e,
      currentInputsValue,
      currentItem.id
    );
    changeItemType(index, updatedItem);
  };

  return (
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
  );
};

export default SelectType;
