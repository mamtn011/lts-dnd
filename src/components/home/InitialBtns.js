import { useItems } from "@/context/ItemContext";
import Undo from "../icons/Undo";
import Redo from "../icons/Redo";
import AddIcon from "../icons/AddIcon";

const InitialBtns = () => {
  const { items, undo, redo, addItem, clearItems, historyIndex, history } =
    useItems();
  return (
    <div className="flex justify-center sm:justify-end gap-2 items-center">
      <button
        onClick={undo}
        disabled={historyIndex.current < 0}
        className="px-1 py-2 border border-gray-300 rounded"
      >
        <Undo />
      </button>
      <button
        onClick={redo}
        className="px-1 py-2 border border-gray-300 rounded"
        disabled={historyIndex.current >= history.current.length - 1}
      >
        <Redo />
      </button>
      <button
        onClick={clearItems}
        className="p-1 border border-gray-300 rounded"
        disabled={items.length === 0}
      >
        Clear
      </button>
      <button
        onClick={addItem}
        className="px-1 py-2 border border-gray-300 rounded"
      >
        <AddIcon />
      </button>
    </div>
  );
};

export default InitialBtns;
