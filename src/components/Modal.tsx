import ReactDOM from "react-dom";
import {type ReactNode} from "react";

type ModalProps = {
    children: ReactNode;
};

const Modal = ({ children }: ModalProps) => {
    const element = document.getElementById("modal-root");
    if (!element) return null;

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded">{children}</div>
    </div>,
    element
  );
};

export default Modal;
