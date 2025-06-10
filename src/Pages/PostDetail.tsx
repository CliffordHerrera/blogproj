import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import type { State } from '../types/types';
import PostDeals from '../components/UI/PostDeals';
import ReactionsBar from '../components/UI/ReactionsBar';
import Coments from '../components/comments/comments';
import Modal from '../components/Modal';
import AddPost from '../components/UI/AddPost';

export default function PostDetail() {
    const { postId } = useParams<{postId: string}>();
    const posts = useSelector((state: State) => state.posts.postData);
    const navigate = useNavigate();
    const showModal = useSelector((state: State) => state.posts.showModal);

    return (
        <div className='bg-slate-200 w-full h-screen mt-20 rounded p-4'>
            {showModal && <Modal><AddPost /></Modal>}
            <div 
            onClick={() => navigate(-1)} 
            className=' hover:bg-blue-300 transition duration-300 w-fit cursor-pointer'>
                ⬅ Назад к списку
                </div>
            {posts.map((p) => p.id === Number(postId) && 
            <div key={p.id}>
                <div className='flex flex-row justify-between'>
                    <h1 className='text-2xl font-bold p-2'>{p.title}</h1>
                    <PostDeals id={p.id} prevTitle={p.title} prevBody={p.body}/>
                </div>
                <p className='p-4 m-10'>{p.body}</p>
                <div className='p-4 m-5'>
                    <h1 className='text-xl font-semibold m-4'>Реакции</h1>
                    <ReactionsBar postId={p.id}/>
                </div>
                <Coments postId={p.id} />
            </div>
            )}
        </div>
    )
}
