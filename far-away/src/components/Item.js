// import React, { useState } from "react";
export default function Item({ item, delitem, checkboxhandle }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => {
          checkboxhandle(item);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button
        onClick={() => {
          delitem(item);
        }}
      >
        ❌
      </button>
    </li>
  );
}
