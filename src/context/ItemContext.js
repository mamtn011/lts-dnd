"use client";
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const history = useRef([]);
  const historyIndex = useRef(-1);

  // get items from localstorage
  useEffect(() => {
    const localData = localStorage.getItem("al_mobin_dnd_items");
    try {
      const itemsFromLocalStore = JSON.parse(localData);
      if (itemsFromLocalStore && itemsFromLocalStore.length > 0) {
        setItems(itemsFromLocalStore);
        history.current = [itemsFromLocalStore];
        historyIndex.current = 0;
      }
    } catch (err) {
      setItems([]);
    }
  }, []);

  // save items to localstorage
  useEffect(() => {
    if (history.current.length > 0) {
      localStorage.setItem(
        "al_mobin_dnd_items",
        JSON.stringify(history.current[historyIndex.current])
      );
    }
  }, [history.current, historyIndex.current]);

  // Save history
  const saveHistory = (newItems) => {
    history.current = history.current.slice(0, historyIndex.current + 1);
    history.current.push(newItems);
    historyIndex.current += 1;
  };

  // undo
  const undo = () => {
    if (historyIndex.current >= 0) {
      historyIndex.current -= 1;
      setItems(history.current[historyIndex.current] || []);
    }
  };

  // redo
  const redo = () => {
    if (historyIndex.current < history.current.length - 1) {
      historyIndex.current += 1;
      setItems(history.current[historyIndex.current]);
    }
  };

  // add item
  const addItem = () => {
    const newItems = [
      ...items,
      {
        wait: "",
      },
    ];
    setItems(newItems);
    saveHistory(newItems);
  };

  // clear items
  const clearItems = () => {
    setItems([]);
    localStorage.removeItem("al_mobin_dnd_items");
  };

  // clone item
  const cloneItem = (index, currentItem) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 0, currentItem);
    setItems(updatedItems);
    saveHistory(updatedItems);
  };

  // delete item
  const deleteItem = (index) => {
    const updatedItems = items.filter((item, i) => i !== index);
    setItems(updatedItems);
    saveHistory(updatedItems);
  };

  // change item type
  const changeItemType = (index, updatedItem) => {
    const updatedItems = items.map((item, i) =>
      i === index ? updatedItem : item
    );
    setItems(updatedItems);
    saveHistory(updatedItems);
  };

  // change selector
  const changeSelector = (index, updatedItem) => {
    const updatedItems = items.map((item, i) =>
      i === index ? updatedItem : item
    );
    setItems(updatedItems);
    saveHistory(updatedItems);
  };

  // change text
  const changeText = (index, updatedItem) => {
    const updatedItems = items.map((item, i) =>
      i === index ? updatedItem : item
    );
    setItems(updatedItems);
    saveHistory(updatedItems);
  };

  // change delay
  const changeDelay = (index, updatedItem) => {
    const updatedItems = items.map((item, i) =>
      i === index ? updatedItem : item
    );
    setItems(updatedItems);
    saveHistory(updatedItems);
  };

  // change JSON value
  const changeJsonValue = (newItems) => {
    setItems(newItems);
    saveHistory(newItems);
  };

  return (
    <ItemsContext.Provider
      value={{
        items,
        setItems,
        undo,
        redo,
        addItem,
        clearItems,
        cloneItem,
        deleteItem,
        changeItemType,
        changeSelector,
        changeText,
        changeDelay,
        changeJsonValue,
        historyIndex,
        history,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

// custom hook for item provider
const ItemsContext = createContext();
export const useItems = () => {
  return useContext(ItemsContext);
};
