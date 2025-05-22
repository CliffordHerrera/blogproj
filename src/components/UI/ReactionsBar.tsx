//import { UseSelector, useDispatch } from "react-redux"
import {Reactions} from '../../jsons/reactions';


export default function ReactionsBar() {
    return (
        <div className="flex flex-row items-center justify-center rounded-xl">
            <button className='bg-blue-500 hover:bg-blue-300 rounded-full m-1'>{Reactions.Like}</button>
            <span className='m-1 bg-slate-400 rounded-full'>23</span>
            <button className='bg-blue-500 hover:bg-blue-300 rounded-full m-1'>{Reactions.LOL}</button>
            <span className='m-1 bg-slate-400 rounded-full'>23</span>
            <button className='bg-blue-500 hover:bg-blue-300 rounded-full m-1'>{Reactions.Dislike}</button>
            <span className='m-1 bg-slate-400 rounded-full'>23</span>
            <button className='bg-blue-500 hover:bg-blue-300 rounded-full m-1'>{Reactions.FuckinShit}</button>
            <span className='m-1 bg-slate-400 rounded-full'>23</span>
            
        </div>
    )
}
