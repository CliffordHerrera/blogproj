import { useSelector, useDispatch } from 'react-redux';
import type { State } from '../../types';
import { updateBody, deletePost, fetchPosts } from '../../redux/slices/postSlice';

export default function PostDeals() {
    const posts = useSelector((state: State) => state.posts.postData);
    const dispatch = useDispatch();

    const postDelete: (id: number) => void = (id) => {
        dispatch(deletePost(id));
    };

    const postEdit: (id: number) => void = (id) => {
        dispatch(updateBody({ id, body: text }));
    };

    return (
        <>
            {posts.map((post) => (
                <div key={post.id} className='flex flex-row justify-between'>
                    <button onClick={() => postEdit(post.id)} className='bg-yellow-500 rounded hover:bg-green-200 transition duration-300'>Edit</button>
                    <button onClick={() => postDelete(post.id)} className='bg-red-700 border rounded hover:bg-red-200 transition duration-300'>Delete</button>
                </div>
            ))}
        </>
    )

}