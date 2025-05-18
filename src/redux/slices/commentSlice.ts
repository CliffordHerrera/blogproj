/**import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { State, Comments } from "../../types";

export const fetchComments = createAsyncThunk<Comments[]>("comments/fetchComments", async () => {
    const responce = await fetch("https://jsonplaceholder.typicode.com/comments?limit=30");
    const data = await responce.json();
    return data;
});




const postsSlice = createSlice({
    name: "posts",
    initialState: {
        commentData: [],
        status: "idle",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchComments.pending, (state: State) => {
            state.status = "loading";
        });
        builder.addCase(fetchComments.fulfilled, (state: State, action: PayloadAction<Comments[]>) => {
            state.status = "succeeded";
            const local = localStorage.getItem("posts");
            state.postData = local ? JSON.parse(local) : action.payload;
        });
        builder.addCase(fetchComments.rejected, (state: State) => {
            state.status = "failed";
        });
    },
});

export default postsSlice.reducer; */