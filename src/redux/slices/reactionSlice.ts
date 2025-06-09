import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type ReactionKey = 'Like' | 'LOL' | 'Dislike' | 'FuckinShit';
export type Reaction =
    {
        [K in ReactionKey]: number;
    } &
    {
        [K in `is${ReactionKey}`]: boolean
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
        setReaction: (state, action: PayloadAction<{ postId: number; reactionType: ReactionKey }>) => {
            const { postId, reactionType } = action.payload;

            if (!state[postId]) {
                state[postId] = { ...initialPostReaction };
            }

            const reactionState = state[postId];
            const isKey = `is${reactionType}` as keyof Reaction;

            if (reactionState[isKey] === true) {
                (reactionState[reactionType] as number) -= 1;
                (reactionState[isKey] as boolean) = false;
                localStorage.setItem("reactions", JSON.stringify(state));
                return;
            }
                for (const key of ['Like', 'LOL', 'Dislike', 'FuckinShit'] as ReactionKey[]) {
                    const otherIsKey = `is${key}` as keyof Reaction;
                    if (state[postId][otherIsKey]) {
                        state[postId][key] -= 1;
                        (state[postId][otherIsKey] as boolean) = false;
                    }
                }
            
            reactionState[reactionType] += 1;
            (reactionState[isKey] as boolean) = true;

            localStorage.setItem("reactions", JSON.stringify(state));
        }

    },
});

export const { setReaction } = reactionSlice.actions;
export default reactionSlice.reducer;