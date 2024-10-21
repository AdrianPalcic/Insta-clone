import { auth, firestore } from "../Firebase/firebase";
import useShowToast from "./useShowToast";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { doc, getDoc } from "firebase/firestore"; 
import useAuthStore from "../store/authStore";

const useLogin = () => {
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const handleLogin = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      showToast("Error", "Please fill all fields", "error");
      return;
    }

    try {
      const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);
      
      if (userCred) {
        const userRef = doc(firestore, 'users', userCred.user.uid);
        const docSnap = await getDoc(userRef);
        const userData = docSnap.data();
        loginUser(userData);
        localStorage.setItem("user-info", JSON.stringify(userData));
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return { 
    loading,
    error,
    handleLogin
  };
};

export default useLogin;