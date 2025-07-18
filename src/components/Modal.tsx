import ReactDOM from "react-dom";
import { type ReactNode } from "react";

const Modal = ({ children }: { children: ReactNode }) => {
  const element = document.getElementById("modal-root");
  if (!element) return null;

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md relative">{children}</div>
    </div>,
    element
  );
};

export default Modal;

