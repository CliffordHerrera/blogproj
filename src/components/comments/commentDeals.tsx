import { useDispatch } from "react-redux";
import { useState } from "react";
import Modal from "../Modal";
import { deleteComment, updateBodyCum } from "../../redux/slices/commentSlice";
import type { State } from "../../types";

export default function CommentDeals({ commentId }: { commentId: number }) {
    const dispatch = useDispatch();
    const [showDel, setShowDel] = useState<boolean>(false);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [body, setBody] = useState<string>('');

    const cumEdit = () => {
        dispatch(updateBodyCum({ id: commentId, name: name, body: body }));
        setShowEdit(false);
    }

    const cumDelete = () => {
        dispatch(deleteComment(commentId));
        setShowDel(false);
    }

    return (
        <div>
            <button
                onClick={() => setShowEdit(true)}
                className="bg-yellow-500 rounded hover:bg-green-200 transition duration-300 mr-2"
            >
                Edit Comment
            </button>

            {showEdit && (
                <Modal>
                    <div className="flex flex-col justify-between mt-2">
                        <h1>Edit Comment</h1>
                        <label htmlFor="title">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                                onClick={cumEdit}
                                className="bg-yellow-500 rounded hover:bg-green-200 transition duration-300"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
            <button onClick={() => setShowDel(true)} className='bg-red-700 border rounded hover:bg-red-200 transition duration-300'>
                Delete Comment
            </button>
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

