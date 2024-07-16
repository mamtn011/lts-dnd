"use client";
import { useRef, useState } from "react";
import AddIcon from "@/components/icons/AddIcon";
import BarIcon from "@/components/icons/BarIcon";
import Redo from "@/components/icons/Redo";
import Undo from "@/components/icons/Undo";
import { findInputsValue } from "@/utils/findInputValues";
import { updateOnSelectChange } from "@/utils/updateOnSelectChange";
import { updateSelector } from "@/utils/updateSelector";
import { findCurrentItemData } from "@/utils/findCurrentItemData";
import { updateText } from "@/utils/updateText";
import { updateDelay } from "@/utils/updateDelay";
export default function Home() {
  const [items, setItems] = useState([]);

  const history = useRef([]);
  const historyIndex = useRef(-1);
  // save history
  const saveHistory = (newItems) => {
    history.current = history.current.slice(0, historyIndex.current + 1);
    history.current.push(newItems);
    historyIndex.current += 1;
  };

  // handle undo
  const handleUndo = () => {
    if (historyIndex.current >= 0) {
      historyIndex.current -= 1;
      setItems(history.current[historyIndex.current] || []);
    }
  };

  // handle redo
  const handleRedo = () => {
    if (historyIndex.current < history.current.length - 1) {
      historyIndex.current += 1;
      setItems(history.current[historyIndex.current]);
    }
  };

  // handle add item
  const handleAddItem = () => {
    const updatedItems = [
      ...items,
      {
        wait: "",
      },
    ];
    setItems(updatedItems);

    saveHistory(updatedItems);
  };
  // handle clear items
  const handleClearItems = () => {
    setItems([]);
  };
  // handle clone item
  const handleCloneItem = (e) => {
    const { index, currentItem } = findCurrentItemData(e, items);
    const updatedItems = items.map((item) => item);
    updatedItems.splice(index, 0, currentItem);
    setItems(updatedItems);
    saveHistory(updatedItems);
  };

  // handle delete item
  const handleDeleteItem = (e) => {
    const { index } = findCurrentItemData(e, items);
    const updatedItems = items.filter((item, i) => i !== index);
    setItems(updatedItems);
    saveHistory(updatedItems);
  };
  // handle change item type
  const handleTypeChange = (e) => {
    // find target item and get its prev value
    const { index, currentItem, type } = findCurrentItemData(e, items);
    const currentInputsValue = findInputsValue(type, currentItem);
    // update item and set into items
    const updatedItem = updateOnSelectChange(e, currentInputsValue);
    const updatedItems = items.map((item, i) =>
      i === index ? updatedItem : item
    );
    setItems(updatedItems);
    saveHistory(updatedItems);
  };
  // handle change selector
  const handleSelectorChange = (e) => {
    const { index, currentItem, type } = findCurrentItemData(e, items);
    // update item and set into items
    const updatedItem = updateSelector(e, currentItem, type);
    const updatedItems = items.map((item, i) =>
      i === index ? updatedItem : item
    );
    setItems(updatedItems);
    saveHistory(updatedItems);
  };
  // handle change text
  const handleTextChange = (e) => {
    const { index, currentItem } = findCurrentItemData(e, items);
    // update item and set into items
    const updatedItem = updateText(e, currentItem);
    const updatedItems = items.map((item, i) =>
      i === index ? updatedItem : item
    );
    setItems(updatedItems);
    saveHistory(updatedItems);
  };
  // handle change delay
  const handleDelayChange = (e) => {
    const { index, currentItem, type } = findCurrentItemData(e, items);
    // update item and set into items
    const updatedItem = updateDelay(e, currentItem, type);
    const updatedItems = items.map((item, i) =>
      i === index ? updatedItem : item
    );
    setItems(updatedItems);
    saveHistory(updatedItems);
  };

  // handle change json value
  const handleJsonChange = (e) => {
    try {
      const updatedItems = JSON.parse(e.target.value);
      setItems(updatedItems);
      saveHistory(updatedItems);
    } catch (error) {
      alert("invalid input");
    }
  };
  // JSX
  return (
    <main className="max-w-7xl mx-auto py-8">
      <div className="w-full flex flex-col justify-between gap-6 lg:flex-row p-4">
        {/* List section  */}
        <div className="w-full lg:w-2/3  flex gap-4 flex-col">
          <h2 className="text-lg text-center sm:text-left font-semibold">
            Browser Instruction List
          </h2>
          {/* clear, add, undo, and redo button  */}
          <div className="flex justify-center sm:justify-end gap-2 items-center">
            <button
              onClick={handleUndo}
              disabled={historyIndex.current < 0}
              className="px-1 py-2 border border-gray-300 rounded"
            >
              <Undo />
            </button>
            <button
              onClick={handleRedo}
              className="px-1 py-2 border border-gray-300 rounded"
              disabled={historyIndex.current >= history.current.length - 1}
            >
              <Redo />
            </button>
            <button
              onClick={handleClearItems}
              className="p-1 border border-gray-300 rounded"
            >
              Clear
            </button>
            <button
              onClick={handleAddItem}
              className="px-1 py-2 border border-gray-300 rounded"
            >
              <AddIcon />
            </button>
          </div>
          {/* list items  */}
          <ul className="flex flex-col gap-4 w-full">
            {items.length > 0 &&
              items.map((item, index) => {
                const type = Object.keys(item)[0];
                const { selector, text, delay } = findInputsValue(type, item);
                return (
                  <li
                    key={index}
                    className="p-1 border border-gray-400 rounded flex gap-1"
                  >
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
              })}
          </ul>
        </div>

        {/* JSON section  */}
        <div className="w-full sm:mx-auto lg:w-1/3 flex gap-4 flex-col">
          <h2 className="text-lg text-center sm:text-left font-semibold">
            JSON Output
          </h2>
          <textarea
            value={JSON.stringify(items, null, 2)}
            onChange={handleJsonChange}
            className="border-2 border-gray-900 h-72 rounded overflow-y-scroll p-2 focus:outline-none"
          ></textarea>
        </div>
      </div>
    </main>
  );
}
