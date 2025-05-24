import { createSlice } from "@reduxjs/toolkit";
import { Reactions } from "../../jsons/reactions";

const initialState: Reactions = Reactions.Like;

export const reactionSlice = createSlice({
    name: "reactions",
    initialState,
    reducers: {
        changeReaction: (state, action) => {
            state = action.payload;
            return state;
        },
    },
});