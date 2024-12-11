import { useState } from "react";
import { useDispatch } from "react-redux";
import { addtocart } from "../features/productreducer";

function AddProduct() {
  const [productName, setproductName] = useState("");
  const [Quantity, setQuantity] = useState("");
  const dispatch = useDispatch();
  return (
    <div>
      <form>
        <input
          onChange={(e) => setproductName(e.target.value)}
          placeholder="productName"
          type="text"
        />

        <input
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="quantity"
          type="number"
        />
      </form>

      <button
        onClick={() => {
          dispatch(addtocart(productName, Quantity));
        }}
      >
        Add to cart
      </button>
    </div>
  );
}

export default AddProduct;
