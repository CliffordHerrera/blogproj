import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateBody, deletePost } from '../../redux/slices/postSlice';
import { eraseComments } from '../../redux/slices/commentSlice';
import Modal from '../Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PostDeals({ id, prevTitle, prevBody }: { id: number, prevTitle: string, prevBody: string }) {
    const dispatch = useDispatch();
    const [showDel, setShowDel] = useState<boolean>(false);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(prevTitle);
    const [body, setBody] = useState<string>(prevBody);
    const inputRef = useRef<HTMLInputElement>(null);


    const notifyEdit = () => toast("Пост успешно изменен!");
    const notifyDelete = () => toast("Пост успешно удален!");

    const postDelete = () => {
        dispatch(deletePost(id));
        dispatch(eraseComments(id));
        notifyDelete();
    };

    const postEdit = () => {
        dispatch(updateBody({ id, title: title, body: body }));
        setShowEdit(false);
        notifyEdit();
    };

    useEffect(() => {
        if (showEdit) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [showEdit]);


    return (
        <div className="flex flex-row justify-between">

            <div
                onClick={() => setShowEdit(true)}
                className='mx-11 hover:bg-slate-400 transition duration-300 rounded'
            >
                <EditIcon />
            </div>

            {showEdit && (
                <Modal>
                    <div className="flex flex-col justify-between mt-2">
                        <div className="flex flex-row items-center justify-center w-full">
                            <h1 className="mx-10 my-1 mb-7 font-bold text-xl">Редактирование поста</h1>
                        </div>
                        <div className="h-0.5 bg-black w-full my-2"></div>
                        <label htmlFor="title">Заголовок</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            ref={inputRef}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border black rounded m-2 p-2"
                        />
                        <label htmlFor="body">Содержание</label>
                        <textarea
                            name="body"
                            id="body"
                            cols={30}
                            rows={10}
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className="border black rounded m-2 p-2">

                        </textarea>
                        <div className="flex flex-row justify-between">
                            <button
                                onClick={() => setShowEdit(false)}
                                className="bg-yellow-500 rounded hover:bg-green-200 transition duration-300 m-3 px-2"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={postEdit}
                                className="bg-yellow-500 rounded hover:bg-green-200 transition duration-300 m-3 px-2"
                            >
                                Сохранить
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
            <div onClick={() => setShowDel(true)}
                className='mx-1 hover:bg-red-400 transition duration-300 rounded'>
                <DeleteIcon />
            </div>
            {showDel && (
                <Modal>
                    <div className="flex flex-col justify-between mt-2">
                        <h1>Вы уверены что хотите удалить этот пост?</h1>
                        <button onClick={() => setShowDel(false)} className="absolute top-2 right-2 hover:scale-125">❌</button>
                        <button
                            onClick={postDelete}
                            className="bg-yellow-500 rounded hover:bg-green-200 transition duration-300 m-2"
                        >
                            Да
                        </button>
                    </div>
                </Modal>
            )}

        </div>
    );
}