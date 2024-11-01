import { Flex, Image, Text } from "@chakra-ui/react"
import { auth, firestore } from "../../Firebase/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import useShowToast from "../../Hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Googleauth = ({ prefix }) => {

    const [signInWithGoogle, error] = useSignInWithGoogle(auth);
    const showToast = useShowToast();
    const loginUser = useAuthStore((state) => state.login);

    const handleGoogleAuth = async () => {
        try {
            const newUser = await signInWithGoogle();
            if (!newUser && error) {
                showToast("Error", error.message, "error")
                return
            }
            const docRef = doc(firestore, "users", newUser.user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                //Login
                const userDoc = docSnap.data();
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);
            } else {
                //Sign up
                const userDoc = {
                    uid: newUser.user.uid,
                    email: inputs.email,
                    username: inputs.username,
                    fullName: inputs.fullName,
                    bio: "",
                    profilePicURL: "",
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now()
                }
                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);
                showToast("Success", "User created succesfully", "success")
            }


        } catch (error) {
            showToast("Error", error.message, "error");
            console.log(error)
        }
    }

    return (
        <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"}
            onClick={handleGoogleAuth}
        >
            <Image src='/google.png' alt='google Logo' w={5} />
            <Text mx={2} color={"blue.500"}>
                {prefix} with Google
            </Text>
        </Flex>
    )
}

export default Googleauth