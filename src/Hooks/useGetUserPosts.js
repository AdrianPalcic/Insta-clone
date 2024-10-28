import { useEffect, useState } from 'react';
import useShowToast from './useShowToast'
import usePostStore from '../store/postStore';
import useUserProfileStore from '../store/userProfileStore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../Firebase/firebase';

const useGetUserPosts = () => {

    const showToast = useShowToast();
    const [isLoading, setIsLoading] = useState(true);
    const {posts, setPosts} = usePostStore();
    const userProfile = useUserProfileStore(state => state.userProfile);

    useEffect(() => {

        const getPosts = async() => {
            if(!userProfile) return
            setIsLoading(true);
            setPosts([]);

            try {

                const q = query(collection(firestore, "posts"), where("createdBy", "==", userProfile.uid))
                const querySnapshot = await getDocs(q)

                const post = [];
                querySnapshot.forEach((doc) => {
                    post.push({...doc.data(), id: doc.id})
                });

                //Sort by latest post (latest on top)
                post.sort((a, b) => b.createdAt - a.createdAt);
                setPosts(post);

            } catch (error) {

                showToast("Error", error.message, "error");
                setPosts([])

            } finally {

                setIsLoading(false);
            }
        }
        getPosts();
    }, [setPosts, userProfile, showToast])

    return {isLoading, posts}

}
export default useGetUserPosts;