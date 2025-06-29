import { useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import Modal from "../Modal";
import { deleteComment, updateBodyCum } from "../../redux/slices/commentSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function CommentDeals({ commentId, commentName, commentBody }: { commentId: number, commentName: string, commentBody: string }) {
    const dispatch = useDispatch();
    const [showDel, setShowDel] = useState<boolean>(false);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [name, setName] = useState<string>(commentName);
    const [body, setBody] = useState<string>(commentBody);
    const inputRef = useRef<HTMLInputElement>(null);

    const cumEdit = () => {
        dispatch(updateBodyCum({ id: commentId, name: name, body: body }));
        setShowEdit(false);
    }

    const cumDelete = () => {
        dispatch(deleteComment(commentId));
        setShowDel(false);
    }

    useEffect(() => {
        if (showEdit) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [showEdit]);

    return (
        <div className="flex flex-row px-3">
            <div
                onClick={() => setShowEdit(true)}
                className="hover:bg-slate-400 transition duration-300 rounded"
            >
                <EditIcon />
            </div>

            {showEdit && (
                <Modal>
                    <div className="flex flex-col justify-between mt-2">
                        <div className="flex flex-row items-center justify-center w-full">
                            <h1 className="mx-10 my-1 mb-7 font-bold text-xl">Редактирование комментария</h1>
                        </div>
                        
                        <div className="h-0.5 bg-black w-full my-2"></div>
                        <label htmlFor="title">Имя пользователя</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            ref={inputRef}
                            onChange={(e) => setName(e.target.value)}
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
                                onClick={cumEdit}
                                className="bg-yellow-500 rounded hover:bg-green-200 transition duration-300 m-3 px-2"
                            >
                                Сохранить
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
            <div onClick={() => setShowDel(true)} className='hover:bg-red-400 transition duration-300 rounded mx-2'>
                <DeleteIcon />
            </div>
            {showDel && (
                <Modal>
                    <div className="flex flex-col justify-between mt-2">
                        <h1>Вы действительно хотите удалить этот комментарий?</h1>
                        <button
                            onClick={cumDelete}
                            className="bg-yellow-500 rounded hover:bg-green-200 transition duration-300 m-2"
                        >
                            Удалить
                        </button>
                        <button onClick={() => setShowDel(false)} className="absolute top-2 right-2 hover:scale-125">❌</button>
                    </div>
                </Modal>
            )}

        </div>
    )
}

