import { auth, firestore } from "../Firebase/firebase";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { doc, setDoc, collection, query, where, getDoc, getDocs } from "firebase/firestore"; 
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useSignUpWithEmailandPassword = () => {
        {/* custom hook that firestore provides for auth */}
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

      const showToast = useShowToast();
      
      const loginUser = useAuthStore(state => state.login);

      const signup = async (inputs) => {
        if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullName) {
            showToast("Error", "Please fill out all fields", "error")
            return
        }
                            {/* baza podataka   kolekcija */}
        const usersRef = collection(firestore, "users");
                {/* Query preko koje izvlacimo podatke */}
        const q = query(usersRef, where("username", "==", inputs.username));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            showToast("Error", "Username already exists", "error")
            return
        }

        try {
            {/* user created through the authentication service */}
            {/* createUserWithEmailAndPassword funckija ce dozvolit da se stvori novi acc na isto ime. Tako da moramo manualno to napravit. RIJEŠENJE IZNAD!! */}
            const newUser = await createUserWithEmailAndPassword(inputs.email,inputs.password);
            if (!newUser && error) {
                showToast("Error", "Failed to create user", "error")
                return
            }

            if (newUser) {
                {/*user document created to be saved in the database (firestore is the reference)*/}
                const userDoc = {
                    uid : newUser.user.uid,
                    email:inputs.email,
                    username:inputs.username,
                    fullName:inputs.fullName,
                    bio:"",
                    profilePicURL: "",
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now()
                }  
                {/* this saves it in the database */}
        { /* reference the storage service */ }{/* start a collection */}{/* place the id */}
                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc)
                showToast("Success", "User created succesfully", "success")
            }
        } catch (error) {
            showToast("Error", error.message, "error")
        }
      }

  return  {
    loading,
    error,
    signup
  }
}

export default useSignUpWithEmailandPassword