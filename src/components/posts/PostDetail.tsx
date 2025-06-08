import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import type { State } from '../../types/types';
import PostDeals from './PostDeals';
import ReactionsBar from '../UI/ReactionsBar';
import Coments from '../comments/comments';
import Modal from '../Modal';
import AddPost from './AddPost';

export default function PostDetail() {
    const { postId } = useParams<{postId: string}>();
    const posts = useSelector((state: State) => state.posts.postData);
    const navigate = useNavigate();
    const showModal = useSelector((state: State) => state.posts.showModal);

    return (
        <div className='bg-gradient-to-br from-blue-500 to-purple-700 w-full h-screen mt-20 rounded-2xl'>
            {showModal && <Modal><AddPost /></Modal>}
            <button 
            onClick={() => navigate(-1)} 
            className='bg-blue-500 rounded hover:bg-blue-300 transition duration-300 fixed top-20 left-4'>
                Back
                </button>
            {posts.map((p) => p.id === Number(postId) && 
            <div>
                <h1 key={p.id}>{p.title}</h1>
                <p>{p.body}</p>
                <PostDeals id={p.id} />
                <ReactionsBar postId={p.id}/>
                <Coments postId={p.id} />
            </div>
            )}
        </div>
    )
}
