import '../../glitch.css';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import type { State } from '../../types';
import PostDeals from './PostDeals';
import ReactionsBar from '../UI/ReactionsBar';

export default function PostDetail() {
    const { postId } = useParams<{postId: string}>();
    //const post = posts.find((p: Posts) => p.id === Number(postId));
    const posts = useSelector((state: State) => state.posts.postData);
    const navigate = useNavigate();
    return (
        <div className='bg-gradient-to-br from-blue-500 to-purple-700 w-full h-screen'>
            <h1 className='relative text-6xl font-bold text-white glitch-text' data-text='test post'>test post </h1>
            <button 
            onClick={() => navigate(-1)} 
            className='bg-blue-500 rounded hover:bg-blue-300 transition duration-300 fixed top-4 left-4'>
                Back
                </button>
            {posts.map((p) => p.id === Number(postId) && 
            <div>
                <h1 key={p.id}>{p.title}</h1>
                <p>{p.body}</p>
                <PostDeals id={p.id} />
                <ReactionsBar />
            </div>
            

            )}
        </div>
    )
}

/**<h1>Post detail {postId}</h1>
            <p>{post?.body}</p> */