import React from "react";
import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

export default function UpdatePriority() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className="my-7 text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export async function action({ params }) {
  const data = { priority: true };
  updateOrder(params.orderId, data);
  return null;
}
