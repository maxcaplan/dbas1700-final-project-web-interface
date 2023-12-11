import { ButtonSize, ButtonType } from "./theme";

export default function Button({
  size = "md",
  type = "primary",
  invert = false,
  border = false,
  className,
  onClick,
  children,
}) {
  return (
    <>
      <button
        className={`${ButtonType[invert ? type + "-invert" : type]} ${
          ButtonSize[size]
        } ${border ? "border" : ""} flex flex-row items-center gap-x-2 rounded ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
}
