import { create } from "zustand"

const useUserProfileStore = create((set) => ({
    userProfile: null,
    setUserProfile: (userProfile) => set({ userProfile }),
    //UPDATE the number of posts
    addPost: (post) => set(state => ({
        //Ubiti ono spreada postove usera i dodaje jos jedan id u post
        userProfile: { ...state.userProfile, posts: [post.id, ...state.userProfile.posts] }
    })),
    deletePost: (id) =>
        set((state) => {
            console.log("Deleting post with id:", id);
            console.log("Posts before deletion:", state.userProfile.posts);
            const updatedPosts = state.userProfile.posts.filter((postId) => postId !== id);
            console.log("Posts after deletion:", updatedPosts);
            return {
                userProfile: {
                    ...state.userProfile,
                    posts: updatedPosts,
                },
            };
        }),

}))

export default useUserProfileStore;