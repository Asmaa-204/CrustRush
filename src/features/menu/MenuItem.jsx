import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateQuantity from "../cart/UpdateQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();

  const cartItem = useSelector((state) =>
    state.cart.cart.find((item) => item.pizzaId === id),
  );
  const inCart = cartItem ? true : false;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 p-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm font-light capitalize italic text-slate-500">
          {ingredients.join(", ")}
        </p>

        <div className="mt-auto flex justify-between">
          {!soldOut ? (
            <p className="text-sm text-slate-500">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="font-semibold uppercase text-slate-500">Sold out</p>
          )}
          {!soldOut && !inCart && (
            <Button onClick={handleAddToCart} type="small">
              Add to cart
            </Button>
          )}
          {!soldOut && inCart && (
            <div className="flex gap-4">
              <UpdateQuantity quantity={cartItem.quantity} pizzaId={id} />
              <DeleteItem pizzaId={id} />
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
