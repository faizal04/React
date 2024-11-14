import React, { useState } from "react";
export default function Form({ additems }) {
  const [description, setdescription] = useState("");
  const [quantity, setquantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    const newitems = { description, quantity, packed: false, id: Date.now() };
    additems(newitems);
    setdescription("");
    setquantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>what do you need for your trip 👍</h3>
      <select value={quantity} onChange={(e) => setquantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={description}
        placeholder="items"
        onChange={(e) => {
          setdescription(e.target.value);
        }}
      />
      <button onClick={handleSubmit}>add</button>
    </form>
  );
}
