import { useSelector } from 'react-redux';
import { useState } from 'react';
import ReactionsBar from './ReactionsBar';
import { Menu, MenuItem } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import LikeIcon from '@mui/icons-material/Favorite';
import PostDeals from './PostDeals';
import 'react-toastify/dist/ReactToastify.css'

import type { State, Comments } from '../../types/types';

export default function PostInterface({ id, prevTitle, prevBody }: { id: number, prevTitle: string, prevBody: string }) {
    const comments = useSelector((state: State) => state.comments.commentData);
    const reactions = useSelector((state: State) => state.reactions);
    const sum = reactions[id]?.Like + reactions[id]?.LOL + reactions[id]?.Dislike + reactions[id]?.FuckinShit;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className='flex flex-row justify-between p-2 border-t-2'>
            <div >
                <CommentIcon />
                {comments.filter((comment: Comments) => comment.postId === id).length}
            </div>
            <div onClick={handleClick} className='ml-10 hover:bg-slate-400 transition duration-300 rounded'>
                <LikeIcon />
                {sum ? sum : 0}
            </div>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleClose}>
                    <ReactionsBar postId={id} />
                </MenuItem>
            </Menu>
            <div className='mx-5'>
                <PostDeals id={id} prevTitle={prevTitle} prevBody={prevBody} />
            </div>

        </div>
    )
}