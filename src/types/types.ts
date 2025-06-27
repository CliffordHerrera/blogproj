import type {  ReactionState } from "../redux/slices/reactionSlice";

export type Posts = {
    userId: number,
    id: number,
    title: string,
    shortDef: string,
    body: string
};

export type Comments = {
    postId: number,
    id: number,
    date: string,
    name: string,
    body: string
};


export type State = {
    posts: {
        postData: Posts[];
        showModal: boolean;
        status: "idle" | "loading" | "succeeded" | "failed";
    },
    comments: {
        commentData: Comments[];
        showModal: number | null;
        status: "idle" | "loading" | "succeeded" | "failed";
    },
    reactions: ReactionState;
}