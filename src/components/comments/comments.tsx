import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import type { AppDispatch } from '../../redux/store';
import type { State, Comments } from "../../types/types";
import CommentDeals from "./commentDeals";
import { addComment } from "../../redux/slices/commentSlice";
import Person2Icon from '@mui/icons-material/Person2';
import { setShowModal } from "../../redux/slices/commentSlice";

export default function Coments({ postId }: { postId: number }) {
    const comments = useSelector((state: State) => state.comments.commentData);
    const dispatch = useDispatch<AppDispatch>();
    const length = comments.filter((comment: Comments) => comment.postId === postId).length;
    const [name, setName] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [error, setError] = useState<{ name?: string; email?: string; body?: string }>({});
    const inputRef = useRef<HTMLInputElement>(null);

    const validate = () => {
        const newError: typeof error = {};

        if (!name.trim()) newError.name = 'Имя обязательно!';
        if (!body.trim()) newError.body = 'Содержание обязательно!';

        setError(newError);
        return Object.keys(newError).length === 0;
    }

    const cumAdd = () => {
        if (!validate()) return;
        dispatch(addComment({ postId: postId, id: comments.length + 1, date: new Date().toISOString(), name: name, body: body }));
        dispatch(setShowModal(null));

        setBody('');
        setName('');
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div className="flex flex-col items-start justify-center bg-slate-100 rounded m-2">
            <h1 className="text-2xl text-black font-bold ml-10">Комментарии ({length})</h1>
            <div className="flex flex-col items-start mt-2 m-5">
                <h1 className="text-xl p-4">Добавить комментарий</h1>
                <label htmlFor="title">Имя</label>
                <input
                    type="text"
                    name='name'
                    value={name}
                    ref={inputRef}
                    onChange={(e) => setName(e.target.value)}
                    className='border black rounded m-2 p-2'
                    required
                />
                {error.name && <p className="text-red-500">{error.name}</p>}

                {error.email && <p className="text-red-500">{error.email}</p>}
                <label htmlFor="body">Содержание комментария</label>
                <textarea
                    name="body"
                    id="body"
                    cols={130}
                    rows={5}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className='border black rounded m-2 p-2'
                    required>
                    Введите текст
                </textarea>
                {error.body && <p className="text-red-500">{error.body}</p>}
                <div className="flex flex-row items-end justify-between w-full">
                    <div></div>
                    <button
                        onClick={cumAdd}
                        className="bg-yellow-500 rounded hover:bg-green-200 transition duration-300 mr-2 m-4 p-1 px-3"
                    >
                        Добавить
                    </button>
                </div>

            </div>

            {comments.map((comment: Comments) => (
                comment.postId === postId &&
                <div key={comment.id} className="flex flex-col items-start bg-slate-300 border m-2 p-2 rounded w-full">
                    <div className="flex flex-row items-start justify-between">
                        <div className="flex flex-row">
                            <Person2Icon />
                            <h3 className="text-lg text-orange-500 font-semibold px-2">{comment.name}</h3>
                            <p className="p-0.5">{new Date(comment.date).toLocaleString()}</p>
                        </div>

                        <div>
                            <CommentDeals commentId={comment.id} commentName={comment.name} commentBody={comment.body} />
                        </div>

                    </div>
                    <p className="p-2">{comment.body}</p>
                </div>
            ))}
        </div>
    )
}


/**
 * <label htmlFor="email">E-mail</label>
                <input
                    type="email"
                    name='email'
                    value={email}
                    onChange={(e) => setMail(e.target.value)}
                    className='border black rounded m-2 p-2'
                    required
                />
 */