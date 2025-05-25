import { useSelector } from "react-redux";
import type { State, Comments } from "../../types";

export default function Coments () {
    const comments = useSelector((state: State) => state.comments.commentData);

    return (
        <div>
            {comments.map((comment: Comments) => (
                <div key={comment.id}>
                    <h3>{comment.name}</h3>
                    <p>{comment.body}</p>
                </div>
            ))}
        </div>
    )
}