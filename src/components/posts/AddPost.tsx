import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, setShowModal } from '../../redux/slices/postSlice';
import type { State } from '../../types';

export default function AddPost() {
    const posts = useSelector((state: State) => state.posts.postData);
    const dispatch = useDispatch();
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    //const showModal = useSelector((state: State) => state.posts.showModal);



    const postAdd = () => {
        dispatch(addPost({ userId: 1, id: posts.length + 1, title: 'title', body: 'body' }));
        dispatch(setShowModal(false));
    };

    return (
        <div className="flex flex-col justify-between mt-2">
            <h1>Add Some Post</h1>
            <label htmlFor="title">Title</label>
            <input
                type="text"
                name='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='border black rounded m-2'
            />
            <label htmlFor="body">Text</label>
            <textarea name="body" id="body" cols={30} rows={10} value={body} onChange={(e) => setBody(e.target.value)}
                className='border black rounded m-2'>
                Enter some text
            </textarea>
            <button
                onClick={postAdd}
                className="bg-yellow-500 rounded hover:bg-green-200 transition duration-300 mr-2"
            >
                Add Post
            </button>
        </div>
    );
}