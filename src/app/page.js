"use client";
import { useState } from "react";
import AddIcon from "@/components/icons/AddIcon";
import BarIcon from "@/components/icons/BarIcon";
import Redo from "@/components/icons/Redo";
import Undo from "@/components/icons/Undo";
import XmarkIcon from "@/components/icons/XmarkIcon";

export default function Home() {
  const [items, setItems] = useState([]);
  const [selector, setSelector] = useState("");
  const [text, setText] = useState("");
  const [delay, setDelay] = useState(0);
  // const [itemType, setItemType] = useState("Wait");
  // add item
  const addItem = () => {
    setItems((prev) => {
      return [
        ...prev,
        {
          wait: "",
        },
      ];
    });
  };
  // change item type
  const handleTypeChange = (e) => {
    const index = Number(e.target.dataset.id);
    const itemToUpdate = items[index];
    const isWait = itemToUpdate.hasOwnProperty("wait");
    const isClick = itemToUpdate.hasOwnProperty("click");
    const isFill = itemToUpdate.hasOwnProperty("fill");
    const isDelay = itemToUpdate.hasOwnProperty("delay");
    // store previous value
    let selector = "";
    let delay = 0;
    let text = "";
    if (isWait) {
      selector = itemToUpdate.wait;
    } else if (isFill) {
      selector = itemToUpdate.fill.selector || "";
      delay = itemToUpdate.fill.delay || 0;
      text = itemToUpdate.fill.text || "";
    } else if (isClick) {
      selector = itemToUpdate.click || "";
    } else {
      delay = itemToUpdate.delay || 0;
    }
    // update item and set into items
    let newItem;
    if (e.target.value === "wait") {
      newItem = { wait: selector };
    } else if (e.target.value === "fill") {
      newItem = { fill: { selector, delay, text } };
    } else if (e.target.value === "delay") {
      newItem = { delay };
    } else {
      newItem = { click: selector };
    }
    const updatedItems = items.map((item, i) => (i === index ? newItem : item));
    setItems(updatedItems);
  };

  // change json value
  const handleJsonChange = (e) => {
    try {
      const updatedItems = JSON.parse(e.target.value);
      const newItems = updatedItems.map((item) => item);
      setItems(newItems);
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
          {/* <InitialBtns /> */}
          <div className="flex justify-center sm:justify-end gap-2 items-center">
            <button className="px-1 py-2 border border-gray-300 rounded">
              <Undo />
            </button>
            <button className="px-1 py-2 border border-gray-300 rounded">
              <Redo />
            </button>
            <button className="p-1 border border-gray-300 rounded">
              Clear
            </button>
            <button
              onClick={addItem}
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
                let selector = "";
                let delay = 0;
                let text = "";
                if (type === "wait") {
                  selector = item.wait;
                } else if (type === "fill") {
                  selector = item.fill.selector || "";
                  delay = item.fill.delay || 0;
                  text = item.fill.text || "";
                } else if (type === "click") {
                  selector = item.click || "";
                } else {
                  delay = item.delay || 0;
                }
                return (
                  <li
                    key={index}
                    className="p-1 border-2 border-gray-300 rounded flex gap-1"
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
                      defaultValue={selector}
                      className={`w-full p-1 border border-gray-300 rounded ${
                        type === "delay" ? "hidden" : ""
                      }`}
                    />
                    <input
                      type="text"
                      name="text"
                      defaultValue={text}
                      className={`w-full p-1 border border-gray-300 rounded ${
                        type === "fill" ? "" : "hidden"
                      }`}
                    />
                    <input
                      type="number"
                      name="delay"
                      defaultValue={delay}
                      className={`w-full p-1 border border-gray-300 rounded ${
                        type === "fill" || type === "delay" ? "" : "hidden"
                      }`}
                    />
                    <button className="p-1 border border-gray-300 rounded">
                      Clone
                    </button>
                    <button className="px-1 py-2 border border-gray-300 rounded">
                      <XmarkIcon />
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
