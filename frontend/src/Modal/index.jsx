import { createPortal } from "react-dom";

function Modal({ children }) {
  return createPortal(
    <div className="w-full bg-primary bg-opacity-40 flex flex-col items-center justify-center fixed top-0 bottom-0 left-0 right-0">
      {children}
    </div>,
    document.getElementById("modal")
  );
}

export { Modal };
