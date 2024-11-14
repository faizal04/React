import React, { useState } from "react";
import Logo from "./Logo.js";
import Form from "./Form.js";
import PackingList from "./PackingList.js";
import Stats from "./Stats.js";

const initialItems = [
  { id: 1, description: "Mobile", quantity: 2, packed: false },
  { id: 2, description: "Charger", quantity: 12, packed: true },
];

export default function App() {
  const [items, setitems] = useState(initialItems);

  function delitem(delindex) {
    setitems((previtems) =>
      previtems.filter((item) => item.id !== delindex.id)
    );
  }

  function additems(item) {
    setitems((previtems) => [...previtems, item]);
  }

  function checkboxhandle(itemreceived) {
    setitems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemreceived.id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form additems={additems} />
      <PackingList
        inititaldata={initialItems}
        items={items}
        delitem={delitem}
        checkboxhandle={checkboxhandle}
        setitem={setitems}
      />
      <Stats item={items} />
    </div>
  );
}
