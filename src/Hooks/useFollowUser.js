import { useEffect, useState } from "react"
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../Firebase/firebase";

const useFollowUser = (userId) => {

    const [isUpdating, setisUpdating] =useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const {user, setUser} = useAuthStore();
    const {userProfile, setUserProfile} = useUserProfileStore();
    const showToast = useShowToast();



    const handleFollowUser = async() => {
        console.log("it is passed")

        setisUpdating(true);

        try {
            //Updating user documents - Backend
            const currentUserRef = doc(firestore, "users", user.uid);
            const userToFollowOrUnfollow = doc(firestore, "users", userId);

            await updateDoc(currentUserRef, {
                following : isFollowing ? arrayRemove(userId) : arrayUnion(userId)
            });

            await updateDoc(userToFollowOrUnfollow, {
                followers : isFollowing ? arrayRemove(user.uid) : arrayUnion(user.uid)
            })

            //Update global user states
            if(isFollowing) {
                //Unfollow
                setUser({
                    ...user,
                    following: user.following.filter(uid => uid !== userId)
                })
                //Kada nismo na nekom profile pageu
                if (userProfile) {
                    setUserProfile({
                        ...userProfile,
                        followers: userProfile.followers.filter(uid => uid !== user.uid)
                    })
                }

                localStorage.setItem("user-info", JSON.stringify({
                    ...user,
                    following: user.following.filter(uid => uid !== userId)
                }))
                setIsFollowing(false);
            } else {
                //Follow
                setUser({
                    ...user,
                    following: [...user.following, userId]
                })
                //Kada nismo na nekom profile pageu
               if (userProfile) {
                setUserProfile({
                    ...userProfile,
                    followers: [...userProfile.followers, user.uid]
                })
               }
                localStorage.setItem("user-info", JSON.stringify({
                    ...user,
                    following: [...user.following, userId]
                }))
                setIsFollowing(true);
            }

        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setisUpdating(false);
        }
    }

    useEffect(() => {
        if (user) {
            //Pratimo li tog korisnika
            const isFollowing = user.following.includes(userId); //returns true or false
            setIsFollowing(isFollowing);
        }
    }, [user, userId])

    return {isUpdating, isFollowing, handleFollowUser}
}

export default useFollowUser