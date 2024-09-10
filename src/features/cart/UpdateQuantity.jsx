import React from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity } from "./cartSlice";

export default function UpdateQuantity({ quantity, pizzaId }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-2">
      <Button onClick={() => dispatch(increaseQuantity(pizzaId))} type="rounded">
        +
      </Button>
      <p>{quantity}</p>
      <Button onClick={() => dispatch(decreaseQuantity(pizzaId))} type="rounded">
        -
      </Button>
    </div>
  );
}
