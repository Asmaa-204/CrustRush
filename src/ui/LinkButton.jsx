import React from "react";
import { Link } from "react-router-dom";

export default function LinkButton({ to, children }) {
  return (
    <Link
      className="text-sm text-blue-500 hover:text-blue-600 hover:underline"
      to={to}
    >
      {children}
    </Link>
  );
}
