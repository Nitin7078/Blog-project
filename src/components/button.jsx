import React from "react";

function Button({
  children,
  type = "button",
  onClick,
  textcolor = "text-white",
  bgcolor = "bg-blue-500",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg ${bgcolor} ${textcolor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;