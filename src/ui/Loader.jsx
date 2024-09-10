import React from "react";

export default function Loader() {
  return (
    <div className="absolute backdrop-blur-sm inset-0 bg-slate-100/20 flex items-center justify-center">
      <div className="loader"></div>
    </div>
  );
}
