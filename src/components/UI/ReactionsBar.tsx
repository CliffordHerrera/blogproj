import { useSelector, useDispatch } from 'react-redux';
import type { State } from '../../types/types';
import { Reactions } from '../../types/reactions';
import { setReaction } from '../../redux/slices/reactionSlice';

type ReactionMap = {
    type: 'Like' | 'LOL' | 'Dislike' | 'FuckinShit';
    emoji: string;
    count: number;
    isReacted: boolean;
}


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

    const reactionsMap: ReactionMap[] = [
        {
            type: 'Like',
            emoji: Reactions.Like,
            count: Like,
            isReacted: isLike,
        },
        {
            type: 'LOL',
            emoji: Reactions.LOL,
            count: LOL,
            isReacted: isLOL,
        },
        {
            type: 'Dislike',
            emoji: Reactions.Dislike,
            count: Dislike,
            isReacted: isDislike,
        },
        {
            type: 'FuckinShit',
            emoji: Reactions.FuckinShit,
            count: FuckinShit,
            isReacted: isFuckinShit,
        },
    ];

    const handleReaction = (type: 'Like' | 'LOL' | 'Dislike' | 'FuckinShit') => {
        dispatch(setReaction({ postId, reactionType: type }));
    }

    return (
        <div className="flex flex-row items-center justify-center rounded-xl">
            {reactionsMap.map(({ type, emoji, count, isReacted }: ReactionMap) => (
                <div key={type} className="flex flex-row items-center justify-center rounded-xl">
                    <button onClick={() => handleReaction(type)} className={`${isReacted ? 'bg-purple-500' : 'bg-blue-500'} hover:bg-blue-300 rounded-full m-1`}>
                        {emoji}
                    </button>
                    <span className='flex items-center justify-center m-1 bg-slate-400 w-5 rounded-full'>{count}</span>
                </div>
            ))}
        </div>

    );
}