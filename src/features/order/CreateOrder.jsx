import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { fetchAddress } from "../user/userSlice";
import store from "../../store";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const formErrors = useActionData();
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";

  const [withPriority, setWithPriority] = useState(false);

  const dispatch = useDispatch();

  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalPrice);
  const priorityPrice = withPriority ? 0.2 * totalPrice : 0;

  const {
    username,
    status: addressStatus,
    error: errorAddress,
    position,
    address,
  } = useSelector((state) => state.user);

  const loadingAddress = addressStatus == "loading";

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="px-4 py-5">
      <h2 className="mb-5 text-xl font-semibold">Ready to order? Let's go!</h2>
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            defaultValue={username}
            className="input grow"
            type="text"
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              disabled={loadingAddress}
              className="input w-full"
              type="text"
              name="address"
              required
              defaultValue={address}
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          {!position && (
            <span className="absolute right-[0.2rem] top-[2.2rem] sm:top-[0.2rem] md:right-[0.4rem] md:top-[0.45rem]">
              <Button
                disabled={loadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                get address
              </Button>
            </span>
          )}
        </div>

        <div className="mb-10 flex items-center gap-2 font-medium">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-5 w-5 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <input
          hidden
          name="cart"
          id="cart"
          defaultValue={JSON.stringify(cart)}
        />
        <input
          type="hidden"
          name="position"
          value={
            position?.longitude && position?.latitude
              ? `${position.latitude},${position.longitude}`
              : ""
          }
        />
        <div>
          <Button type="primary" disabled={isLoading || loadingAddress}>
            {isLoading
              ? "Placing order..."
              : `Order now for $${totalPrice + priorityPrice}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = "Invalid phone number";
    return errors;
  }

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  console.log(newOrder);
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
