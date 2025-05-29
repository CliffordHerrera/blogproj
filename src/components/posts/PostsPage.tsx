import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { State } from '../../types';
import { fetchPosts, setShowModal } from '../../redux/slices/postSlice';
import PostDeals from './PostDeals';
import AddPost from './AddPost';
import Modal from '../Modal';
import { Loader } from '../UI/loader';
import '../../glitch.css';
import ReactionsBar from '../UI/ReactionsBar';
import Coments from '../comments/comments';


export default function PostsPage() {
    //const [posts, setPosts] = useState<Posts[]>(posts);
    const posts = useSelector((state: State) => state.posts.postData);
    //const [text, setText] = useState<string>('');
    const dispatch = useDispatch();
    const showModal = useSelector((state: State) => state.posts.showModal);
    const status = useSelector((state: State) => state.posts.status);

    useEffect(() => {
        if (posts.length === 0) {
            dispatch(fetchPosts());
        }

    }, [dispatch, posts.length]);

    const setModal = () => {
        dispatch(setShowModal(true));
    }

    const refresh: () => Promise<void> = async () => {
        localStorage.clear();
        dispatch(fetchPosts());
        console.log('refreshed!');
    }

    //console.log(posts);
    //console.log(localStorage);
    return (
        <div className='flex flex-col justify-center max-w-screen'>
            <h1 className='relative text-6xl font-bold mt-10'>PostsPage</h1>
            <button
                onClick={() => refresh()}
                className='bg-blue-300 hover:bg-blue-500 border-black rounded m-3 fixed top-1 right-1'>
                Refresh
            </button>
            {status === 'loading' && <Loader />}
            {status === 'succeeded' && <>
            <button onClick={() => setModal()}
                className='bg-blue-300 hover:bg-blue-500 border-black rounded m-3 fixed top-20 left-1'>Add Post</button>
            {showModal && <Modal><AddPost /></Modal>}
            
            <div className='flex flex-col items-center justify-center'>
                {posts.map((post) => (

                    <div key={post.id} className='w-6xl bg-gradient-to-br from-slate-300 to-blue-400 rounded-2xl p-4  m-4'>
                        <Link to={`/posts/${post.id}`} key={post.id} >
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                        </Link>
                        <PostDeals id={post.id} />
                        <ReactionsBar />
                        <Coments postId={post.id} />
                    </div>
                ))}
            </div>
            </>
            
            }
            
            {status === 'failed' && <div>Failed to load</div>}
        </div>
    )
};



