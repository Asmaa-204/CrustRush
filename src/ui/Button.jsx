import React from "react";
import { Link } from "react-router-dom";

export default function Button({ onClick, children, disabled, to, type }) {
  const base =
    "inline-block rounded-full bg-yellow-400 text-sm font-medium uppercase tracking-wide transition-colors duration-200 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-amber-400 focus:ring-offset-2 disabled:cursor-not-allowed";
  const styles = {
    rounded: base + " py-1 px-2.5",
    small: base + " py-2 px-4 text-xs",
    primary: base + " py-3 px-6",
    secondary:
      "inline-block rounded-full border-2 border-stone-400 px-6 py-3 text-sm font-medium uppercase tracking-wide text-stone-400 transition-colors duration-200 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed",
  };

  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  return (
    <button onClick={onClick} disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}
