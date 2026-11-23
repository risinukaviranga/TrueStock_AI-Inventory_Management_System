import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
}

export default function Button({
  children,
  variant = "primary",
  onClick,
}: ButtonProps) {
  const baseStyles =
    "rounded-lg px-4 py-2 text-sm font-semibold transition-colors";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
    outline: "border border-slate-300 hover:bg-slate-100",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}