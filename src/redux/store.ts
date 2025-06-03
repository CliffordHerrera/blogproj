import { configureStore } from "@reduxjs/toolkit";
import  postsReducer  from "./slices/postSlice";
import  commentsReducer  from "./slices/commentSlice";
import  reactionReducer  from "./slices/reactionSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        comments: commentsReducer,
        reactions: reactionReducer
    },
});

