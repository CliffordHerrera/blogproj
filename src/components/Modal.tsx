import ReactDOM from "react-dom";
import {type ReactNode} from "react";
import { useDispatch } from "react-redux";
import { setShowModal } from "../redux/slices/postSlice";

const Modal = ({ children }: {children: ReactNode}) => {
    const element = document.getElementById("modal-root");
    const dispatch = useDispatch();
    if (!element) return null;

  return ReactDOM.createPortal(
    <div onClick={() => dispatch(setShowModal(false))} className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md relative">{children}</div>
    </div>,
    element
  );
};

export default Modal;
