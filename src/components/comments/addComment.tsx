import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { State } from "../../types/types";
import { addComment, setShowModal } from "../../redux/slices/commentSlice";


export default function AddComment({ postId }: { postId: number }) {
    const comments = useSelector((state: State) => state.comments.commentData);
    const dispatch = useDispatch();
    const [name, setName] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [email, setMail] = useState<string>('');
    const [error, setError] = useState<{ name?: string; email?: string; body?: string }>({});
    const inputRef = useRef<HTMLInputElement>(null);

    const validate = () => {
        const newError: typeof error = {};

        if (!name.trim()) newError.name = 'Name is required';
        if (!email.trim()) newError.email = 'Email is required';
        if (!body.trim()) newError.body = 'Text is required';
        else if (!/^\S+@\S+\.\S+$/.test(email)) newError.email = "Invalid email format";

        setError(newError);
        return Object.keys(newError).length === 0;
    }

    const cumAdd = () => {
        if (!validate()) return;
        dispatch(addComment({ postId: postId, id: comments.length + 1, name: name, body: body, email: email }));
        dispatch(setShowModal(null));

        setBody('');
        setName('');
        setMail('');
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);


    return (
        <div className="flex flex-col justify-between mt-2">
            <h1>Add Some Comment</h1>
            <button
                onClick={() => dispatch(setShowModal(null))}
                onKeyDown={(e) => {
                    if (e.key === 'Esc' || e.key === ' ') {
                        dispatch(setShowModal(null));
                    }
                }}
                className="absolute top-2 right-2 hover:scale-125">❌</button>
            <label htmlFor="title">Title</label>
            <input
                type="text"
                name='name'
                value={name}
                ref={inputRef}
                onChange={(e) => setName(e.target.value)}
                className='border black rounded m-2'
                required
            />
            {error.name && <p className="text-red-500">{error.name}</p>}
            <label htmlFor="email">E-mail</label>
            <input
                type="email"
                name='email'
                value={email}
                onChange={(e) => setMail(e.target.value)}
                className='border black rounded m-2'
            />
            {error.email && <p className="text-red-500">{error.email}</p>}
            <label htmlFor="body">Text</label>
            <textarea name="body" id="body" cols={30} rows={10} value={body} onChange={(e) => setBody(e.target.value)}
                className='border black rounded m-2'>
                Enter some text
            </textarea>
            {error.body && <p className="text-red-500">{error.body}</p>}
            <button
                onClick={cumAdd}
                className="bg-yellow-500 rounded hover:bg-green-200 transition duration-300 mr-2"
            >
                Add Comment
            </button>
        </div>
    );
}