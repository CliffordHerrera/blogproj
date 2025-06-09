import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateBody, deletePost } from '../../redux/slices/postSlice';
import type { State, Comments } from '../../types/types';
import Modal from '../Modal';
import CommentIcon from '@mui/icons-material/Comment';
import LikeIcon from '@mui/icons-material/Favorite';
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
    const comments = useSelector((state: State) => state.comments.commentData);


    const notifyEdit = () => toast("Пост успешно изменен!");
    const notifyDelete = () => toast("Пост успешно удален!");

    const postDelete = () => {
        dispatch(deletePost(id));
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
        <div className="flex flex-row justify-evenly mt-2">
            <div>
                <CommentIcon />
                {comments.filter((comment: Comments) => comment.postId === id).length}
            </div>
            <div>
                <LikeIcon />
            </div>
            <div
                onClick={() => setShowEdit(true)}
            >
                <EditIcon />
            </div>

            {showEdit && (
                <Modal>
                    <div className="flex flex-col justify-between mt-2">
                        <h1>Редактирование поста</h1>
                        <label htmlFor="title">Заголовок</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            ref={inputRef}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border black rounded m-2 p-2"
                        />
                        <label htmlFor="body">Text</label>
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
                                className="bg-yellow-500 rounded hover:bg-green-200 transition duration-300"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={postEdit}
                                className="bg-yellow-500 rounded hover:bg-green-200 transition duration-300"
                            >
                                Сохранить
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
            <div onClick={() => setShowDel(true)}>
                <DeleteIcon />
            </div>
            {showDel && (
                <Modal>
                    <div className="flex flex-col justify-between mt-2">
                        <h1>Вы уверены что хотите удалить этот пост?</h1>
                        <button
                            onClick={() => setShowDel(false)}
                            className="bg-yellow-500 rounded hover:bg-green-200 transition duration-300 m-2"
                        >
                            Отмена
                        </button>
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



/**
 * function App(){
    const notify = () => toast("This is a toast notification !");
    return (
    <div>
        <button onClick={notify}>Notify !</button>
        <ToastContainer />
      </div>
    )
}
 */