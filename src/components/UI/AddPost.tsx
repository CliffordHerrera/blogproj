import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addPost, setShowModal } from '../../redux/slices/postSlice';
import { toast } from 'react-toastify';

export default function AddPost() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState<string>('');
    const [shortDef, setShortDef] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [error, setError] = useState<{ title?: string; shortDef?: string; body?: string }>({});
    const inputRef = useRef<HTMLInputElement>(null);

    const notifyAdd = () => toast("Пост успешно добавлен!");
    const validate = () => {
        const newError: typeof error = {};

        if (!title.trim()) newError.title = 'Название обязательно!';
        if (!shortDef.trim()) newError.shortDef = 'Краткое описание обязательно!';
        if (!body.trim()) newError.body = 'Содержание обязательно!';

        setError(newError);
        return Object.keys(newError).length === 0;
    }


    const postAdd = () => {
        if (!validate()) return;
        dispatch(addPost({ userId: 1, id: Date.now(), title: title, shortDef: shortDef, body: body }));
        dispatch(setShowModal(false));

        setBody('');
        setShortDef('');
        setTitle('');
        notifyAdd();
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);



    return (
        <div className="flex flex-col justify-between mt-2">
            <h1>Создать пост</h1>
            <button onClick={() => dispatch(setShowModal(false))} className="absolute top-2 right-2 hover:scale-125">❌</button>
            <label htmlFor="title">Заголовок</label>
            <input
                type="text"
                name='title'
                value={title}
                ref={inputRef}
                onChange={(e) => setTitle(e.target.value)}
                className='border black rounded m-2 p-2'
                required
            />
            {error.title && <p className='text-red-500'>{error.title}</p>}
            <label htmlFor="shortDef">Краткое описание</label>
            <textarea
                name="shortDef"
                id="shortDef"
                cols={50}
                rows={5}
                value={shortDef}
                onChange={(e) => setShortDef(e.target.value)}
                className='border black rounded m-2 p-2'
                required>
                Введите краткое описание
            </textarea>
            {error.shortDef && <p className='text-red-500'>{error.shortDef}</p>}
            <label htmlFor="body">Содержание</label>
            <textarea
                name="body"
                id="body"
                cols={30}
                rows={10}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className='border black rounded m-2 p-2' 
                required>
                Введите содержание своего поста
            </textarea>
            {error.body && <p className='text-red-500 pb-2'>{error.body}</p>}
            <button
                onClick={postAdd}
                className="bg-yellow-500 rounded hover:bg-green-200 transition duration-300 mr-2"
            >
                Опубликовать
            </button>
        </div>
    );
}