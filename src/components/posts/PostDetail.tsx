
import { useParams } from 'react-router-dom';

export default function PostDetail() {
    const { postId } = useParams<{postId: string}>();
    //const post = posts.find((p: Posts) => p.id === Number(postId));
    return (
        <div>
            <h1>test post </h1>
        </div>
    )
}

/**<h1>Post detail {postId}</h1>
            <p>{post?.body}</p> */