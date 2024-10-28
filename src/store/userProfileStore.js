import {create} from "zustand"

const useUserProfileStore = create((set) => ({
    userProfile: null,
    setUserProfile: (userProfile) => set({userProfile}),
    //UPDATE the number of posts
    addPost:(post) => set(state => ({
                            //Ubiti ono spreada postove usera i dodaje jos jedan id u post
        userProfile: {...state.userProfile, posts: [post.id, ...state.userProfile.posts]}
    })),
    deletePost: (id) => set((state) => ({
        userProfile: {
            ...state.userProfile,
            posts: state.userProfile.posts.filter((post) => post.id !== id)
        }
    }))
}))

export default useUserProfileStore;