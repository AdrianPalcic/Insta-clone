import { useState } from 'react'
import useAuthStore from '../store/authStore';
import useShowToast from './useShowToast';
import { auth, firestore, storage } from '../Firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import useUserProfileStore from '../store/userProfileStore';
import { useNavigate } from 'react-router-dom';



            {/* OVO je zapravo funkcija koja updatea profil behind the sc */}

     
            const useEditProfile = () => {
                const [isLoading, setisLoading] = useState(false);
                const navigate = useNavigate();
                const authUser = useAuthStore((state) => state.user);
                const setAuthUser = useAuthStore((state) => state.setUser);
                const setUserProfile = useUserProfileStore((state) => state.setUserProfile);
            
                const showToast = useShowToast();
            
                const editProfile = async (inputs, selectedFile) => {
                    if (isLoading || !authUser) return;
                    setisLoading(true);
            
                    const storageRef = ref(storage, `profilePics/${authUser.uid}`);
                    const userDocRef = doc(firestore, "users", authUser.uid);
            
                    let URL = "";
                    try {
                        if (selectedFile) {
                            await uploadString(storageRef, selectedFile, "data_url");
                            URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
                        }
            
                        const updatedUser = {
                            ...authUser,
                            fullName: inputs.fullName || authUser.fullName,
                            username: inputs.username || authUser.username,
                            bio: inputs.bio || authUser.bio,
                            profilePicURL: URL || authUser.profilePicURL,
                        };
            
                        await updateDoc(userDocRef, updatedUser);
                        localStorage.setItem("user-info", JSON.stringify(updatedUser));
                        setAuthUser(updatedUser);
                        setUserProfile(updatedUser);
                        showToast("Success", "Profile updated successfully", "success");
                        navigate(`/${updatedUser.username}`);
                    } catch (error) {
                        showToast("Error", error.message, "error");
                    }
                };
            
                return { editProfile, isLoading };
            };
            
            export default useEditProfile;