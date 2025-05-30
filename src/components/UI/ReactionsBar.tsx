import { useSelector, useDispatch } from 'react-redux';
import type { State } from '../../types';
import { Reactions } from '../../jsons/reactions';
import { setReaction } from '../../redux/slices/reactionSlice';


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

    const handleReaction = (type: 'Like' | 'LOL' | 'Dislike' | 'FuckinShit') => {
        dispatch(setReaction({ postId, reactionType: type }));
    }

    return (
        <div className="flex flex-row items-center justify-center rounded-xl">
            <button onClick={() => handleReaction('Like')} className={`${isLike ? 'bg-purple-500' : 'bg-blue-500'} hover:bg-blue-300 rounded-full m-1`}>
                {Reactions.Like}
            </button>
            <span className='m-1 bg-slate-400 w-5 rounded-full'>{Like}</span>

            <button onClick={() => handleReaction('LOL')} className={`${isLOL ? 'bg-purple-500' : 'bg-blue-500'} hover:bg-blue-300 rounded-full m-1`}>
                {Reactions.LOL}
            </button>
            <span className='m-1 bg-slate-400 w-5 rounded-full'>{LOL}</span>

            <button onClick={() => handleReaction('Dislike')} className={`${isDislike ? 'bg-purple-500' : 'bg-blue-500'} hover:bg-blue-300 rounded-full m-1`}>
                {Reactions.Dislike}
            </button>
            <span className='m-1 bg-slate-400 w-5 rounded-full'>{Dislike}</span>

            <button onClick={() => handleReaction('FuckinShit')} className={`${isFuckinShit ? 'bg-purple-500' : 'bg-blue-500'} hover:bg-blue-300 rounded-full m-1`}>
                {Reactions.FuckinShit}
            </button>
            <span className='m-1 bg-slate-400 w-5 rounded-full'>{FuckinShit}</span>
        </div>
    );
}