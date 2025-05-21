import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBody, deletePost } from '../../redux/slices/postSlice';
import type { State } from '../../types';
import Modal from '../Modal';

type PostDealsProps = {
    id: number;
    text: string;
};

export default function PostDeals({ id }: PostDealsProps) {
    const dispatch = useDispatch();
    const posts = useSelector((state: State) => state.posts.postData);
    const [showDel, setShowDel] = useState<boolean>(false);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');

    const postDelete = () => {
        dispatch(deletePost(id));
    };

    const postEdit = () => {
        dispatch(updateBody({ id, title: title, body: body }));
        setShowEdit(false);
    };



    return (
        <div className="flex flex-row justify-between mt-2">
            <button
                onClick={() => setShowEdit(true)}
                className="bg-yellow-500 rounded hover:bg-green-200 transition duration-300 mr-2"
            >
                Edit Post
            </button>

            {showEdit && (
                <Modal>
                    <div className="flex flex-col justify-between mt-2">
                        <h1>Edit Post</h1>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
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
            <button onClick={() => setShowDel(true)} className='bg-red-700 border rounded hover:bg-red-200 transition duration-300'>
                Delete Post
            </button>
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


/**   */