import React, { useState } from "react";
import Item from "./Item.js";
export default function PackingList({
  items,
  delitem,
  checkboxhandle,
  setitem,
}) {
  let [sortby, setsortby] = useState("input");
  let sorteditems = items.slice();

  if (sortby === "input") sorteditems = items;
  if (sortby === "description") {
    sorteditems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortby === "packed") {
    sorteditems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  return (
    <div className="list">
      <ul>
        {sorteditems.map((item) => (
          <Item
            key={item.id}
            item={item}
            delitem={delitem}
            checkboxhandle={checkboxhandle}
          />
        ))}
      </ul>
      <div className="actions">
        <select onChange={(e) => setsortby(e.target.value)}>
          <option value="input">sort by input</option>
          <option value="description">sort by description</option>
          <option value="packed">sort by packed</option>
        </select>

        <button
          className="actions"
          onClick={() => {
            const alertvalue = window.confirm(
              "Are you sure you want to delete all items"
            );
            if (alertvalue) setitem([]);
          }}
        >
          clear
        </button>
      </div>
    </div>
  );
}
