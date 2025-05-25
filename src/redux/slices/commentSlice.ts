import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Comments } from "../../types";

type CommentState = {
    commentData: Comments[];
    showModal: boolean;
    status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: CommentState = {
    commentData: [],
    showModal: false,
    status: "idle",
}

export const fetchComments = createAsyncThunk<Comments[]>("posts/fetchComments", async () => {
    const responce = await fetch("https://jsonplaceholder.typicode.com/comments");
    const data = await responce.json();
    return data;
});

const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        deleteComment: (state, action: PayloadAction<number>) => {
            state.commentData = state.commentData.filter((p) => p.id !== action.payload);
            localStorage.setItem("posts", JSON.stringify(state.commentData));
        },
        addComment: (state, action: PayloadAction<Comments>) => {
            state.commentData.push(action.payload);
            localStorage.setItem("posts", JSON.stringify(state.commentData));
        },
        setShowModal: (state, action: PayloadAction<boolean>) => {
            state.showModal = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchComments.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comments[]>) => {
            state.status = "succeeded";
            const local = localStorage.getItem("posts");
            state.commentData = local ? JSON.parse(local) : action.payload;
        });
        builder.addCase(fetchComments.rejected, (state) => {
            state.status = "failed";
        });
    },
});



export const {  deleteComment, addComment, setShowModal } = commentSlice.actions
export default commentSlice.reducer;

/**updateBody: (state, action: PayloadAction<{ id: number; title: string; body: string }>) => {
            const post = state.commentData.find((p) => p.id === action.payload.id);
            if (post) {
                post.body = action.payload.body;
                post.title = action.payload.title;
            };
            localStorage.setItem("posts", JSON.stringify(state.commentData));
        }, */