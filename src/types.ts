export type Posts = {
    userId: number,
    id: number,
    title: string,
    body: string
};

export type Comments = {
    postId: number,
    id: number,
    name: string,
    email: string,
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
}

//export type RootState = ReturnType<typeof store.getState>;