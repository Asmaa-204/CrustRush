import React from "react";
import { Link } from "react-router-dom";

import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

export default function Header() {
  return (
    <div className="flex items-center justify-between bg-yellow-400 p-4 text-left uppercase">
      <Link to="/" className="tracking-wide">
        Crust Rush
      </Link>
      <SearchOrder />
      <Username />
    </div>
  );
}
