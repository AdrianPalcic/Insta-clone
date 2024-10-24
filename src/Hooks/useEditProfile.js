import { useState } from 'react'
import useAuthStore from '../store/authStore';
import useShowToast from './useShowToast';
import { auth, firestore, storage } from '../Firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import useUserProfileStore from '../store/userProfileStore';



            {/* OVO je zapravo funkcija koja updatea profil behind the sc */}

const useEditProfile = () => {
  
    const [isLoading, setIsLoading] = useState(false);
    const authUser = useAuthStore(state => state.user);
    const setAuthUser = useAuthStore(state => state.setUser);
    const setUserProfile = useUserProfileStore(state => state.setUserProfile);

    const showToast = useShowToast();


    const editProfile = async(inputs, selectedFile) => {
        if (isLoading || !authUser) return;
        setIsLoading(true);

        const storageRef = ref(storage, `profilePics/${authUser.uid}`);
        const userDocRef = doc(firestore, "users", authUser.uid)

        let URL = "";
        try {
            if (selectedFile) {
                await uploadString(storageRef, selectedFile, 'data-url');
                URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`))
            }

            {/* Ako nema ovoga " ...authUser, " onda ce se izbrisat sve ostalo. Znaci followers,following etc. */}
            const updatedUser = {
                ...authUser,
                fullName : inputs.fullname || authUser.fullName,
                username : inputs.username || authUser.username,
                bio: inputs.bio || authUser.bio,
                profilePic: URL || authUser.profilePicURL,
            }

            await updateDoc(userDocRef, updatedUser);
            localStorage.setItem("user-info",JSON.stringify(updatedUser));
            setAuthUser(updatedUser);
            setUserProfile(updatedUser)
            showToast("Success", "User updated succesfully", "success")
            
        } catch (error) {
            showToast("Error", error.message, "error")
        }
}

    return {editProfile, isLoading}

}
export default useEditProfile