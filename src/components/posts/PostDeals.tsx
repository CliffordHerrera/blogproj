import { useState, useRef, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { updateBody, deletePost } from '../../redux/slices/postSlice';
import type { State } from '../../types/types';
import Modal from '../Modal';
import CommentIcon from '@mui/icons-material/Comment';
import LikeIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function PostDeals({ id }: { id: number }) {
    const dispatch = useDispatch();
    const [showDel, setShowDel] = useState<boolean>(false);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);
    const comments = useSelector((state: State) => state.comments.commentData);

    const postDelete = () => {
        dispatch(deletePost(id));
    };

    const postEdit = () => {
        dispatch(updateBody({ id, title: title, body: body }));
        setShowEdit(false);
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
            <div
                onClick={() => setShowEdit(true)}
            >
                <EditIcon />
            </div>

            {showEdit && (
                <Modal>
                    <div className="flex flex-col justify-between mt-2">
                        <h1>Edit Post</h1>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            ref={inputRef}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border black rounded m-2"
                        />
                        <label htmlFor="body">Text</label>
                        <textarea
                            name="body"
                            id="body"
                            cols={30}
                            rows={10}
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className="border black rounded m-2">

                        </textarea>
                        <div className="flex flex-row justify-between">
                            <button
                                onClick={() => setShowEdit(false)}
                                className="bg-yellow-500 rounded hover:bg-green-200 transition duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={postEdit}
                                className="bg-yellow-500 rounded hover:bg-green-200 transition duration-300"
                            >
                                Save
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
                        <h1>Are you sure you wanna delete this post?</h1>
                        <button
                            onClick={() => setShowDel(false)}
                            className="bg-yellow-500 rounded hover:bg-green-200 transition duration-300 m-2"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={postDelete}
                            className="bg-yellow-500 rounded hover:bg-green-200 transition duration-300 m-2"
                        >
                            Delete
                        </button>
                    </div>
                </Modal>
            )}

        </div>
    );
}