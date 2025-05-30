import { createSlice } from "@reduxjs/toolkit";
import { Reactions } from "../../jsons/reactions";

export type Reaction =
    {
        Like: number,
        LOL: number,
        Dislike: number,
        FuckinShit: number,
        isLike: boolean,
        isLOL: boolean,
        isDislike: boolean,
        isFuckinShit: boolean
    }

    ;

export type ReactionState = {
    [postId: number]: Reaction;
}

const initialState: ReactionState = JSON.parse(localStorage.getItem("reactions") || "{}");

const initialPostReaction: Reaction = {
    Like: 0,
    LOL: 0,
    Dislike: 0,
    FuckinShit: 0,
    isLike: false,
    isLOL: false,
    isDislike: false,
    isFuckinShit: false
};

export const reactionSlice = createSlice({
    name: "reactions",
    initialState,
    reducers: {
        addLike: (state, action) => {
            const postId = action.payload;
            if (!state[postId]) {
                state[postId] = {
                    ...initialPostReaction
                };
            };
            state[postId].Like += 1;
            state[postId].isLike = !state[postId].isLike
            localStorage.setItem("reactions", JSON.stringify(state));
        },
        unLike: (state, action) => {
            const postId = action.payload;
            if (state[postId]?.isLike) {
                state[postId].Like -= 1;
                state[postId].isLike = !state[postId].isLike
            };
            localStorage.setItem("reactions", JSON.stringify(state));
        },
        addLOL: (state, action) => {
            const postId = action.payload;
            if (!state[postId]) {
                state[postId] = {
                    ...initialPostReaction
                };
            };
            state[postId].LOL += 1;
            state[postId].isLOL = !state[postId].isLOL
            localStorage.setItem("reactions", JSON.stringify(state));
        },
        unLOL: (state, action) => {
            const postId = action.payload;
            if (state[postId]?.isLOL) {
                state[postId].LOL -= 1;
                state[postId].isLOL = !state[postId].isLOL
            };
            localStorage.setItem("reactions", JSON.stringify(state));
        },
        addDislike: (state, action) => {
            const postId = action.payload;
            if (!state[postId]) {
                state[postId] = {
                    ...initialPostReaction
                };
            };
            state[postId].Dislike += 1;
            state[postId].isDislike = !state[postId].isDislike
            localStorage.setItem("reactions", JSON.stringify(state));
        },
        unDislike: (state, action) => {
            const postId = action.payload;
            if (state[postId]?.isDislike) {
                state[postId].Dislike -= 1;
                state[postId].isDislike = !state[postId].isDislike
            };
            localStorage.setItem("reactions", JSON.stringify(state));
        },
        addFuckinShit: (state, action) => {
            const postId = action.payload;
            if (!state[postId]) {
                state[postId] = {
                    ...initialPostReaction
                };
            };
            state[postId].FuckinShit += 1;
            state[postId].isFuckinShit = !state[postId].isFuckinShit
            localStorage.setItem("reactions", JSON.stringify(state));
        },
        unFuckinShit: (state, action) => {
            const postId = action.payload;
            if (state[postId]?.isFuckinShit) {
                state[postId].FuckinShit -= 1;
                state[postId].isFuckinShit = !state[postId].isFuckinShit
            };
            localStorage.setItem("reactions", JSON.stringify(state));
        },
    },
});

export const { addLike, addLOL, addDislike, addFuckinShit, unLike, unLOL, unDislike, unFuckinShit } = reactionSlice.actions;
export default reactionSlice.reducer;