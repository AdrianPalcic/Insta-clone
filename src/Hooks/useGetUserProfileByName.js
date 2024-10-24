import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";
import { firestore } from "../Firebase/firebase";

const useGetUserProfileByName = (username) => {
 
const [isLoading, setIsLoading] = useState(true);
const showToast = useShowToast();
const {userProfile ,setUserProfile} = useUserProfileStore();


useEffect(() => {
    const getUserProfile = async() => {

        setIsLoading(true);

        try {

            const q = query(collection(firestore, "users"), where("username", "==", username));
            const querySnapshot = await getDocs(q);

            if(querySnapshot.empty) return setUserProfile(null);

 {/* Uvijek ce bit jedan dokument ali je i array obliku pa mozemo koristit for each */}
            let userDoc;
            querySnapshot.forEach((doc) => {
                userDoc = doc.data();
            })

            setUserProfile(userDoc);
        
        } catch (error) {
            showToast("Error", error.message, "error")
        } finally {
            setIsLoading(false);
        }
    }
    getUserProfile()
}, [setUserProfile, username, showToast])

return { isLoading, userProfile }

}

export default useGetUserProfileByName