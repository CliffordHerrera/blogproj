import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Comments } from "../../types/types";

type CommentState = {
    commentData: Comments[];
    showModal: number | null;
    status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: CommentState = {
    commentData: [],
    showModal: null,
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
            localStorage.setItem("comments", JSON.stringify(state.commentData));
        },
        addComment: (state, action: PayloadAction<Comments>) => {
            state.commentData.push(action.payload);
            localStorage.setItem("comments", JSON.stringify(state.commentData));
        },
        updateBodyCum: (state, action: PayloadAction<{ id: number; name: string; body: string }>) => {
            const comment = state.commentData.find((p) => p.id === action.payload.id);
            if (comment) {
                comment.body = action.payload.body;
                comment.name = action.payload.name;
            };
            localStorage.setItem("comments", JSON.stringify(state.commentData));
        },
        setShowModal: (state, action: PayloadAction<number | null>) => {
            state.showModal = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchComments.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comments[]>) => {
            state.status = "succeeded";
            const local = localStorage.getItem("comments");
            state.commentData = local ? JSON.parse(local) : action.payload;
        });
        builder.addCase(fetchComments.rejected, (state) => {
            state.status = "failed";
        });
    },
});



export const {  deleteComment, addComment, updateBodyCum, setShowModal } = commentSlice.actions
export default commentSlice.reducer;
