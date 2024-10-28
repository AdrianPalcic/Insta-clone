import {create} from "zustand"

const useUserProfileStore = create((set) => ({
    userProfile: null,
    setUserProfile: (userProfile) => set({userProfile}),
    //UPDATE the number of posts
    addPost:(post) => set(state => ({
                            //Ubiti ono spreada postove usera i dodaje jos jedan id u post
        userProfile: {...state.userProfile, posts: [post.id, ...state.userProfile.posts]}
    }))
}))

export default useUserProfileStore;