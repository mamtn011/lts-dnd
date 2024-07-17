import { useItems } from "@/context/ItemContext";
import { findCurrentItemData } from "@/utils/findCurrentItemData";
import { updateText } from "@/utils/updateText";
const TextInput = ({ type, index, text }) => {
  const { items, changeText } = useItems();
  // handle change text
  const handleTextChange = (e) => {
    const { index, currentItem } = findCurrentItemData(e, items);
    // update item and set into items
    const updatedItem = updateText(e, currentItem);
    changeText(index, updatedItem);
  };

  return (
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
  );
};

export default TextInput;
