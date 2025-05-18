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

export type Reactions = {
    type: string
};

export type State = {
    posts: {
        postData: Posts[];
        status: "idle" | "loading" | "succeeded" | "failed";
    }
}

//export type RootState = ReturnType<typeof store.getState>;