import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    const newItem = { ...item, id: Date.now().toString() };
    setItems([...items, newItem]);
  };

  const deleteItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateItem = (itemId, updatedItem) => {
    const updatedItems = items.map((item) => (item.id === itemId ? { ...item, text: updatedItem } : item));
    setItems(updatedItems);
  };

  return (
    <AppContext.Provider value={{ items, addItem, deleteItem, updateItem }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
