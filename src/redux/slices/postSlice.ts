import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
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

export const fetchPosts = createAsyncThunk<Posts[]>("posts/fetchPosts", async () => {
    const responce = await fetch("https://jsonplaceholder.typicode.com/posts?limit=10");
    const data = await responce.json();
    return data;
});

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
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Posts[]>) => {
            state.status = "succeeded";
            const local = localStorage.getItem("posts");
            state.postData = local ? JSON.parse(local) : action.payload;
        });
        builder.addCase(fetchPosts.rejected, (state) => {
            state.status = "failed";
        });
    },
});



export const { updateBody, deletePost, addPost, setShowModal } = postsSlice.actions
export default postsSlice.reducer;