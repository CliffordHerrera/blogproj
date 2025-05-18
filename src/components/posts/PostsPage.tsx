import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { State } from '../../types';
import { updateBody, deletePost, fetchPosts } from '../../redux/slices/postSlice';


export default function PostsPage() {
    //const [posts, setPosts] = useState<Posts[]>(posts);
    const posts = useSelector((state: State) => state.posts.postData);
    const [text, setText] = useState<string>('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (posts.length === 0) {
            dispatch(fetchPosts());
        }

    }, [dispatch]);

    const postDelete = (id: number) => {
        dispatch(deletePost(id));
    };

    const postEdit = (id: number) => {
        dispatch(updateBody({ id, body: text }));
    };

    console.log(posts);
    return (
        <div className='flex flex-col justify-center'>
            <h1>PostsPage</h1>
            <div className='flex flex-col items-center justify-center'>
                {posts.map((post) => (
                    <Link to={`/posts/${post.id}`} key={post.id} >
                        <div key={post.id} className='w-3xl bg-gradient-to-br from-slate-300 to-blue-400 rounded-2xl p-4  m-4'>
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                            <div className='flex flex-row justify-between'>
                                <button onClick={() => postEdit(post.id)} className='bg-yellow-500 rounded hover:bg-green-200 transition duration-300'>Edit</button>
                                <button onClick={() => postDelete(post.id)} className='bg-red-700 border rounded hover:bg-red-200 transition duration-300'>Delete</button>
                            </div>
                            <input
                                type="text"
                                placeholder='Temp for editing'
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="bg-white border border-gray-400 p-2 rounded hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
};



//transition-transform hover:scale-105
//bg-gradient-to-br from-yellow-600 to-orange-600 border
//bg-gradient-to-br from-red-600 to-red-800
/**    const editPost = (id: number) => {
        dispatch(posts.map((post) => (
            post.id === id ? { ...post, body: text } : post
        )))
    }

    const deletePost = (id: number) => {
        setposts(posts.filter((post) => post.id !== id))
    } */