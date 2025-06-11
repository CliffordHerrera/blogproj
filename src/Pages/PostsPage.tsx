import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { State } from '../types/types';
import PostInterface from '../components/UI/PostInterface';
import AddPost from '../components/UI/AddPost';
import Modal from '../components/Modal';
import { ToastContainer } from 'react-toastify';



export default function PostsPage() {
    const posts = useSelector((state: State) => state.posts.postData);
    const showModal = useSelector((state: State) => state.posts.showModal);
    const status = 'succeeded';



    return (
        <div className="grid grid-cols-[2fr_10fr] gap-4 p-4">
            <ToastContainer />

            {posts.length === 0 && <div className='fixed top-1/2 left-1/2'>Здесь пока ничего нет 😢</div>}
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
                                            <p>{post.shortDef}</p>
                                        </Link>
                                        <div className='m-2 border-black'>
                                            <PostInterface  id={post.id} prevBody={post.body} prevTitle={post.title} />
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

/**useEffect(() => {
        if (posts.length === 0) {
            dispatch(fetchPosts());
        }

    }, [dispatch, posts.length]);

    useEffect(() => {
        if (comments.length === 0) {
            dispatch(fetchComments());
        }

    }, [dispatch, comments.length]); */