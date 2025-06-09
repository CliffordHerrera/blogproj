import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch} from '../../redux/store';
import type { State, Comments } from "../../types/types";
import CommentDeals from "./commentDeals";
import AddComment from "./addComment";
import Modal from "../Modal";
import { setShowModal } from "../../redux/slices/commentSlice";

export default function Coments({ postId }: { postId: number }) {
    const comments = useSelector((state: State) => state.comments.commentData);
    const dispatch = useDispatch<AppDispatch>();
    const showAdd = useSelector((state: State) => state.comments.showModal);

    return (
        <div className="flex flex-col items-center justify-center bg-pink-500 border-black rounded-2xl m-2">
            <h1 className="text-xl text-green-500 font-bold">Comments</h1>

            {comments.map((comment: Comments) => (
                comment.postId === postId &&
                <div key={comment.id} className="flex flex-col items-center justify-center bg-blue-400 m-2 p-2 rounded">
                    <h3 className="text-lg text-red-700 font-semibold">{comment.name}</h3>
                    <p>{comment.body}</p>
                    <CommentDeals commentId={comment.id} />
                </div>
            ))}
            <button
                onClick={() => dispatch(setShowModal(postId))}
                className="bg-yellow-500 rounded hover:bg-green-200 transition duration-300 m-2">
                Add Comment
            </button>
            {showAdd === postId && 
            <Modal>
                <AddComment postId={postId}/>
            </Modal>}
            
        </div>
    )
}


/**
 *     useEffect(() => {
        if (comments.length === 0) {
            dispatch(fetchComments());
        }

    }, [dispatch, comments.length]);
 */