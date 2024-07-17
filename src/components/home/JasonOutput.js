import { useItems } from "@/context/ItemContext";
import { downloadJson } from "@/utils/downloadJson";
import { validateJsonFile } from "@/utils/validateJsonFile";
import { useRef } from "react";

const JasonOutput = () => {
  const { items, changeJsonValue } = useItems();
  const itemsForJson = items.map(({ id, ...rest }) => rest);
  const fileInputRef = useRef(null);
  // handle change json value
  const handleJsonChange = (e) => {
    try {
      const updatedItems = JSON.parse(e.target.value);
      const newItems = updatedItems.map((item) => ({
        id: Date.now() + Math.random(),
        ...item,
      }));
      changeJsonValue(newItems);
    } catch (error) {
      alert("invalid input");
    }
  };
  // import json file
  const importJson = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const importedItems = JSON.parse(evt.target.result);
          const isValid = validateJsonFile(importedItems);
          if (!isValid) {
            alert("invalid json input!");
          } else {
            const newItems = importedItems.map((item) => ({
              id: Date.now() + Math.random(),
              ...item,
            }));
            changeJsonValue(newItems);
          }
        } catch (err) {
          alert("invalid json input!");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="w-full sm:mx-auto lg:w-1/3 flex gap-4 flex-col">
      <div className="flex flex-col gap-2 sm:flex-row justify-center sm:justify-between">
        <h2 className="text-lg text-center sm:text-left font-semibold">
          JSON Output
        </h2>
        <div className="flex gap-2 sm:justify-end justify-center">
          <button
            onClick={() => downloadJson(itemsForJson)}
            className="p-1 border border-gray-300 rounded"
          >
            Export
          </button>
          <input
            type="file"
            accept=".json"
            ref={fileInputRef}
            onChange={importJson}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="p-1 border border-gray-300 rounded"
          >
            Import
          </button>
        </div>
      </div>
      <textarea
        value={JSON.stringify(itemsForJson, null, 2)}
        onChange={handleJsonChange}
        className="border-2 border-gray-900 h-72 rounded overflow-y-scroll p-2 focus:outline-none"
      ></textarea>
    </div>
  );
};

export default JasonOutput;
