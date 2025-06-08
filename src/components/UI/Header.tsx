import '../../glitch.css';
import { useDispatch, useSelector } from 'react-redux';
import type { State } from '../../types/types';
import type { AppDispatch } from '../../redux/store';
import { setShowModal, fetchPosts } from '../../redux/slices/postSlice';

export default function Header() {
    const dispatch = useDispatch<AppDispatch>();
    const showModal = useSelector((state: State) => state.posts.showModal);

    const setModal = () => {
        dispatch(setShowModal(true));
    }

    const refresh: () => Promise<void> = async () => {
        localStorage.clear();
        dispatch(fetchPosts());
    }

    return (
        <div className="fixed top-0 flex flex-row items-center justify-between bg-gradient-to-br from-blue-500 to-blue-800 w-screen h-20">
            <h1 onClick={refresh} className="text-3xl text-white font-bold glitch-text m-4" data-text="Assbook">Assbook</h1>
            <button
                onClick={setModal}
                className="bg-blue-300 hover:bg-blue-500 border-black rounded m-3"
            >
                Создать пост
            </button>
        </div>
    )
}