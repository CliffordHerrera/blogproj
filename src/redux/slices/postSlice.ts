import { createSlice,  type PayloadAction } from "@reduxjs/toolkit";
import type { Posts } from "../../types/types";

type PostsState = {
    postData: Posts[];
    showModal: boolean;
    status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: PostsState = {
    postData: [],
    showModal: false,
    status: "idle",
}



const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        updateBody: (state, action: PayloadAction<{ id: number; title: string; body: string }>) => {
            const post = state.postData.find((p) => p.id === action.payload.id);
            if (post) {
                post.body = action.payload.body;
                post.title = action.payload.title;
            };
            localStorage.setItem("posts", JSON.stringify(state.postData));
        },
        deletePost: (state, action: PayloadAction<number>) => {
            state.postData = state.postData.filter((p) => p.id !== action.payload);
            localStorage.setItem("posts", JSON.stringify(state.postData));
        },
        addPost: (state, action: PayloadAction<Posts>) => {
            state.postData.push(action.payload);
            localStorage.setItem("posts", JSON.stringify(state.postData));
        },
        setShowModal: (state, action: PayloadAction<boolean>) => {
            state.showModal = action.payload
        }
    },
});



export const { updateBody, deletePost, addPost, setShowModal } = postsSlice.actions
export default postsSlice.reducer;

