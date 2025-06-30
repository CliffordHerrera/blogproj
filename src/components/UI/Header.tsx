import '../../glitch.css';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import { setShowModal } from '../../redux/slices/postSlice';

export default function Header() {
    const dispatch = useDispatch<AppDispatch>();

    const setModal = () => {
        dispatch(setShowModal(true));
    }



    return (
        <div className="fixed top-0 flex flex-row items-center justify-between bg-gradient-to-br from-blue-500 to-blue-800 w-screen h-20">
            <h1  className="text-3xl text-white font-bold glitch-text m-4" data-text="Assbook">Assbook</h1>
            <button
                onClick={setModal}
                className="bg-blue-300 hover:bg-blue-500 border-black rounded m-10 p-1 px-2"
            >
                Создать пост
            </button>
        </div>
    )
}