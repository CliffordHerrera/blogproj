import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import type { State } from '../types/types';
import { fetchPosts } from '../redux/slices/postSlice';
import { fetchComments } from '../redux/slices/commentSlice';
import PostDeals from '../components/posts/PostDeals';
import AddPost from '../components/posts/AddPost';
import Modal from '../components/Modal';
import CircularProgress from '@mui/material/CircularProgress';
//import ReactionsBar from '../components/UI/ReactionsBar';
import { ToastContainer } from 'react-toastify';



export default function PostsPage() {
    const posts = useSelector((state: State) => state.posts.postData);
    const comments = useSelector((state: State) => state.comments.commentData);
    const dispatch = useDispatch<AppDispatch>();
    const showModal = useSelector((state: State) => state.posts.showModal);
    const status = useSelector((state: State) => state.posts.status);

    useEffect(() => {
        if (posts.length === 0) {
            dispatch(fetchPosts());
        }

    }, [dispatch, posts.length]);

    useEffect(() => {
        if (comments.length === 0) {
            dispatch(fetchComments());
        }

    }, [dispatch, comments.length]);

    return (
        <div className="grid grid-cols-[2fr_10fr] gap-4 p-4">
            <ToastContainer />
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
                                    <div key={post.id} className="flex flex-col justify-between bg-gradient-to-br from-slate-100 to-gray-200 rounded p-4 shadow-md">
                                        <Link to={`/posts/${post.id}`}>
                                            <h2 className="text-xl font-bold">{post.title}</h2>
                                            <p>{post.body}</p>
                                        </Link>
                                        <div className='m-2 border-black'>
                                            <PostDeals  id={post.id} prevBody={post.body} prevTitle={post.title} />
                                        </div>
                                        
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

//<ReactionsBar postId={post.id} />