import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { firestore } from "../Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

//Ova funckija je tu da dobijem komentare jer u bazi podataka pod komentari nam pise samo id usera a moramo renderat njeg ime i sliku
const useGetUserProfileById = (userId) => {

    const [isLoading, setIsLoading] = useState(true);
    const [userProfile, setUserProfile] = useState(null);
    const showToast = useShowToast();

    useEffect(() => {
        const getUserProfile = async () => {
            setIsLoading(true);
            setUserProfile(null);
            try {

                const userRef = await getDoc(doc(firestore, "users", userId));
                if (userRef.exists()) {
                    setUserProfile(userRef.data());
                }

            } catch (error) {
                showToast("Error", error.message, "error")
                setUserProfile(null);
            } finally {
                setIsLoading(false);
            }

        }
        getUserProfile()
    }, [showToast, setUserProfile, userId])
    return { userProfile, isLoading, setUserProfile }
}

export default useGetUserProfileById