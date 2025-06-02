import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, setShowModal } from '../../redux/slices/postSlice';
import type { State } from '../../types';

export default function AddPost() {
    const posts = useSelector((state: State) => state.posts.postData);
    const dispatch = useDispatch();
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [error, setError] = useState<{ title?: string; body?: string }>({});
    const inputRef = useRef<HTMLInputElement>(null);
    const validate = () => {
        const newError: typeof error = {};

        if (!title.trim()) newError.title = 'Title is required';
        if (!body.trim()) newError.body = 'Text is required';

        setError(newError);
        return Object.keys(newError).length === 0;
    }


    const postAdd = () => {
        if (!validate()) return;
        dispatch(addPost({ userId: 1, id: posts.length + 1, title: title, body: body }));
        dispatch(setShowModal(false));

        setBody('');
        setTitle('');
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);



    return (
        <div className="flex flex-col justify-between mt-2">
            <h1>Add Some Post</h1>
            <button onClick={() => dispatch(setShowModal(false))} className="absolute top-2 right-2 hover:scale-125">❌</button>
            <label htmlFor="title">Title</label>
            <input
                type="text"
                name='title'
                value={title}
                ref={inputRef}
                onChange={(e) => setTitle(e.target.value)}
                className='border black rounded m-2'
                required
            />
            {error.title && <p className='text-red-500'>{error.title}</p>}
            <label htmlFor="body">Text</label>
            <textarea name="body" id="body" cols={30} rows={10} value={body} onChange={(e) => setBody(e.target.value)}
                className='border black rounded m-2' required>
                Enter some text
            </textarea>
            {error.body && <p className='text-red-500'>{error.body}</p>}
            <button
                onClick={postAdd}
                className="bg-yellow-500 rounded hover:bg-green-200 transition duration-300 mr-2"
            >
                Add Post
            </button>
        </div>
    );
}