import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { State } from "../../types";
import { addComment, setShowModal } from "../../redux/slices/commentSlice";


export default function AddComment ({ postId }: { postId: number }) {
    const comments = useSelector((state: State) => state.comments.commentData);
    const dispatch = useDispatch();
    const [name, setName] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [email, setMail] = useState<string>('');
    const showModal = useSelector((state: State) => state.comments.showModal);



    const cumAdd = () => {
        dispatch(addComment({ postId: postId, id: comments.length + 1, name: name, body: body, email: email }));
        dispatch(setShowModal(false));
    };

    return (
        <div className="flex flex-col justify-between mt-2">
            <h1>Add Some Post</h1>
            <label htmlFor="title">Title</label>
            <input
                type="text"
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='border black rounded m-2'
            />
            <label htmlFor="email">E-mail</label>
            <input
                type="text"
                name='email'
                value={email}
                onChange={(e) => setMail(e.target.value)}
                className='border black rounded m-2'
            />
            <label htmlFor="body">Text</label>
            <textarea name="body" id="body" cols={30} rows={10} value={body} onChange={(e) => setBody(e.target.value)}
                className='border black rounded m-2'>
                Enter some text
            </textarea>
            <button
                onClick={cumAdd}
                className="bg-yellow-500 rounded hover:bg-green-200 transition duration-300 mr-2"
            >
                Add Comment
            </button>
        </div>
    );
}