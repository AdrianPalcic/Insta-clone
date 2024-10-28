import {create} from "zustand";


//Global store u kojim spremamo postove usera
const usePostStore = create((set) => ({
    posts: [],
    createPost : (post) => set(state => ({posts: [post, ...state.posts]})),
    deletePost: (id) => set(state => ({posts: state.posts.filter((post) => post.id !== id)})),
    //addComment,
    setPosts: (posts) => set({posts})
}))

export default usePostStore;