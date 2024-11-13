import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList inititaldata={initialItems} />
      <Stats />
    </div>
  );
}
function Logo() {
  return <h1>Far Away 🚄</h1>;
}

function Form() {
  const [description, setdescription] = useState("");
  const [quantity, setquantity] = useState();
  function handleSubmit(e) {
    e.preventDefault();
    console.log(description);
    const newItems = { description, quantity, packed: false, id: Date.now() };
    <Item item={newItems} />;
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
      <button>add</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}
function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>you have x items in the list</em>
    </footer>
  );
}
