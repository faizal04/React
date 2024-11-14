// import React, { useState } from "react";
export default function Stats({ item }) {
  if (!item.length)
    return <em className="stats">Start Planning your trip🚄</em>;
  const count = item.length;
  const numpacked = item.filter((i) => i.packed);
  const packedPercent = Math.round((numpacked.length / count) * 100);

  return (
    <footer className="stats">
      {packedPercent === 100 ? (
        <em>you got everything! Ready to Go!</em>
      ) : (
        <em>
          you have {count} items in the list,& you have already packed{" "}
          {packedPercent}% items
        </em>
      )}
    </footer>
  );
}
