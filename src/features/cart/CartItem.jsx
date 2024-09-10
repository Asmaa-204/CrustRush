import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateQuantity from "./UpdateQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, unitPrice } = item;
  const totalPrice = quantity * unitPrice;

  return (
    <li className="flex flex-col py-2 md:flex-row md:items-center md:justify-between">
      <p>
        <span className="font-semibold"> {quantity}&times; </span>
        {name}
      </p>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold">{formatCurrency(totalPrice)}</p>
        <div className="flex gap-4">
          <UpdateQuantity quantity={quantity} pizzaId={pizzaId} />
          <DeleteItem pizzaId={pizzaId} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
