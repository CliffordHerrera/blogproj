import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import type { State } from '../../types/types';
import { fetchPosts, setShowModal } from '../../redux/slices/postSlice';
import PostDeals from './PostDeals';
import AddPost from './AddPost';
import Modal from '../Modal';
import CircularProgress from '@mui/material/CircularProgress';
import '../../glitch.css';
import ReactionsBar from '../UI/ReactionsBar';


export default function PostsPage() {
    const posts = useSelector((state: State) => state.posts.postData);
    const dispatch = useDispatch<AppDispatch>();
    const showModal = useSelector((state: State) => state.posts.showModal);
    const status = useSelector((state: State) => state.posts.status);

    useEffect(() => {
        if (posts.length === 0) {
            dispatch(fetchPosts());
        }

    }, [dispatch, posts.length]);

    return (
        <div className="grid grid-cols-[2fr_10fr] gap-4 p-4">
            {status === 'loading' && 
            <div className='fixed top-1/2 left-1/2'>
                <CircularProgress size="3rem" />
            </div>}
            
            {posts.length === 0 && <div className='fixed top-1/2 left-1/2'>No posts</div>}
            <div className="grid grid-cols-[2fr_10fr] gap-4 p-4">
                <div>
                    {status === 'succeeded' && (
                        <>
                            {showModal && <Modal><AddPost /></Modal>}

                            <div className="grid grid-cols-3 gap-4 mt-20 w-7xl">
                                {[...posts].reverse().map((post) => (
                                    <div key={post.id} className="bg-gradient-to-br from-slate-300 to-gray-300 rounded-2xl p-4 shadow-md">
                                        <Link to={`/posts/${post.id}`}>
                                            <h2 className="text-xl font-bold">{post.title}</h2>
                                            <p>{post.body}</p>
                                        </Link>
                                        <PostDeals id={post.id} />
                                        <ReactionsBar postId={post.id} />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

        </div>
    )
};

