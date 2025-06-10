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
        <div className="flex flex-row">
            <div
                onClick={() => setShowEdit(true)}
                className="hover:bg-slate-400 transition duration-300 rounded"
            >
                <EditIcon />
            </div>

            {showEdit && (
                <Modal>
                    <div className="flex flex-col justify-between mt-2">
                        <h1>Edit Comment</h1>
                        <label htmlFor="title">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            ref={inputRef}
                            onChange={(e) => setName(e.target.value)}
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
                                onClick={cumEdit}
                                className="bg-yellow-500 rounded hover:bg-green-200 transition duration-300"
                            >
                                Сохранить
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
            <div onClick={() => setShowDel(true)} className='hover:bg-red-400 transition duration-300 rounded'>
                <DeleteIcon />
            </div>
            {showDel && (
                <Modal>
                    <div className="flex flex-col justify-between mt-2">
                        <h1>Are you sure you wanna delete this comment?</h1>
                        <button
                            onClick={() => setShowDel(false)}
                            className="bg-yellow-500 rounded hover:bg-green-200 transition duration-300 m-2"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={cumDelete}
                            className="bg-yellow-500 rounded hover:bg-green-200 transition duration-300 m-2"
                        >
                            Delete
                        </button>
                    </div>
                </Modal>
            )}

        </div>
    )
}

