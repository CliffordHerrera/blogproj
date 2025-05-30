import { useSelector, useDispatch } from 'react-redux';
import type { State } from '../../types';
import { Reactions } from '../../jsons/reactions';
import { addLike, addLOL, addDislike, addFuckinShit, unLike, unLOL, unDislike, unFuckinShit } from '../../redux/slices/reactionSlice';


export default function ReactionsBar({ postId }: { postId: number }) {
    const dispatch = useDispatch();

    const reactionData = useSelector((state: State) =>
        state.reactions[postId]
    );

        const {
        Like = 0,
        LOL = 0,
        Dislike = 0,
        FuckinShit = 0,
        isLike = false,
        isLOL = false,
        isDislike = false,
        isFuckinShit = false,
    } = reactionData || {};

    const handleLike = () => {
        if (isLike) {
            dispatch(unLike(postId));
        } else {
            dispatch(addLike(postId));
        }
    };

    const handleLOL = () => {
        if (isLOL) {
            dispatch(unLOL(postId));
        } else {
            dispatch(addLOL(postId));
        }
    };

    const handleDislike = () => {
        if (isDislike) {
            dispatch(unDislike(postId));
        } else {
            dispatch(addDislike(postId));
        }
    };

    const handleFuckinShit = () => {
        if (isFuckinShit) {
            dispatch(unFuckinShit(postId));
        } else {
            dispatch(addFuckinShit(postId));
        }
    };

    return (
        <div className="flex flex-row items-center justify-center rounded-xl">
            <button onClick={handleLike} className={`${isLike ? 'bg-purple-500' : 'bg-blue-500'} hover:bg-blue-300 rounded-full m-1`}>
                {Reactions.Like}
            </button>
            <span className='m-1 bg-slate-400 w-5 rounded-full'>{Like}</span>

            <button onClick={handleLOL} className={`${isLOL ? 'bg-purple-500' : 'bg-blue-500'} hover:bg-blue-300 rounded-full m-1`}>
                {Reactions.LOL}
            </button>
            <span className='m-1 bg-slate-400 w-5 rounded-full'>{LOL}</span>

            <button onClick={handleDislike} className={`${isDislike ? 'bg-purple-500' : 'bg-blue-500'} hover:bg-blue-300 rounded-full m-1`}>
                {Reactions.Dislike}
            </button>
            <span className='m-1 bg-slate-400 w-5 rounded-full'>{Dislike}</span>

            <button onClick={handleFuckinShit} className={`${isFuckinShit ? 'bg-purple-500' : 'bg-blue-500'} hover:bg-blue-300 rounded-full m-1`}>
                {Reactions.FuckinShit}
            </button>
            <span className='m-1 bg-slate-400 w-5 rounded-full'>{FuckinShit}</span>
        </div>
    );
}