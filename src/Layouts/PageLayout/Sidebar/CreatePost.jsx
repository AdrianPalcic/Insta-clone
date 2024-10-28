import { Box, Flex, Tooltip, Textarea, Input, Button, useDisclosure, CloseButton, Image } from "@chakra-ui/react";
import { CreatePostLogo } from "../../../assets/Contants";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import usePreviewImage from "../../../Hooks/usePreviewImage";
import useShowToast from "../../../Hooks/useShowToast";
import useAuthStore from "../../../store/authStore";
import usePostStore from "../../../store/postStore";
import useUserProfileStore from "../../../store/userProfileStore";
import { useLocation } from "react-router-dom";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../../../Firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const CreatePost = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [caption, setCaption] = useState("");
    const imageRef = useRef(null);
    const {handleImageChange, selectedFile, setSelectedFile} = usePreviewImage();
   const {isLoading, handleCreatePost} = useCreatePost();
   const showToast = useShowToast();

   //Stvorili smo ovu funckciju da mozemo dodat ove naredbe nakon zvanja handleCreatePost funcking
   const handlePostCreation = async() => {
    try {
        
        await handleCreatePost(selectedFile, caption);
        onClose();
        setCaption("");
        setSelectedFile(null);

    } catch (error) {
        showToast("Error", error.message, "error");
    }
   }
	return (
		<>
			<Tooltip
				hasArrow
				label={"Create"}
				placement='right'
				ml={1}
				openDelay={500}
				display={{ base: "block", md: "none" }}
			>
				<Flex
					alignItems={"center"}
					gap={4}
					_hover={{ bg: "whiteAlpha.400" }}
					borderRadius={6}
					p={2}
					w={{ base: 10, md: "full" }}
					justifyContent={{ base: "center", md: "flex-start" }}
                    onClick={onOpen}
				>
					<CreatePostLogo />
					<Box display={{ base: "none", md: "block" }}>Create</Box>
				</Flex>
			</Tooltip>

            <Modal isOpen={isOpen} onClose={onClose}  size='xl'>
            <ModalOverlay />
                 <ModalContent bg={"black"} border={"1px solid gray"}>
                    <ModalHeader>Create Post</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pb={6}>
                        <Textarea placeholder='Post caption...'
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        />

                        <Input type='file' hidden ref={imageRef} onChange={handleImageChange} />

                        <BsFillImageFill
                            onClick={() => imageRef.current.click()}
                            style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
                            size={16}
                        />

                        {selectedFile && (
                           
                            <Flex
                            mt={5}
                            w={"full"}
                            position={"relative"}   
                            justifyContent={"center"}
                            >
                                <Image src={selectedFile} />

                                <CloseButton
                                position={"absolute"}
                                top={2}
                                right={2}
                                onClick={() => {
                                setSelectedFile(
                                    null
                                );
                                }}
                                />

                            </Flex>
                        )}
                    </ModalBody>
                  <ModalFooter>
                    <Button mr={3} onClick={handlePostCreation} isLoading={isLoading}>Post</Button>
                   </ModalFooter>
             </ModalContent>
            </Modal>

		</>
	);
};

export default CreatePost;

function useCreatePost() {
    const showToast = useShowToast();
    const [isLoading, setIsLoading] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const createPost = usePostStore((state) => state.createPost);
    const addPost = useUserProfileStore((state) => state.addPost);    
    const {pathname} = useLocation();

    const handleCreatePost = async(selectedFile, caption) => {
        if(isLoading) return;
        if (!selectedFile) throw new Error("Please select an image");

        setIsLoading(true);

        const newPost = {
            caption: caption,
            likes: [],
            comments: [],
            createdAt: Date.now(),
            createdBy: authUser.uid,
        }
        try {
            
            const postDocRef = await addDoc(collection(firestore, "posts"), newPost); //Napravi novi doc unutar "posts" kolekcije i dodaj "newPost" objekt
            const userDocRef = doc(firestore, "users", authUser.uid); //Referencaj naseg korisnika
            const imageRef = ref(storage, `posts/${postDocRef.id}`); //Referencaj path u kojem ce bit image od posta
            await updateDoc(userDocRef, {           //VALJDA kada koristimo updateDoc funckiju iz firebase ne treba napravit kopiju dokumenta (...spread)
                posts: arrayUnion(postDocRef.id) //Dodaj novi post unutar "posts" objekta u profilu naseg korisnika
                
            })
            console.log("Updated Doc")
            await uploadString(imageRef, selectedFile, "data_url"); //uploadaj image kao data-url string
            const downloadURL = await getDownloadURL(imageRef); //Do something idk what //IG nakon ovoga to je slika
            await updateDoc(postDocRef, {imageURL: downloadURL}) // unutar dokumenta koji sadrzava podatke naseg posta dodaj sliku, opet valjda ne treba kopirat array
            console.log("This too")
            newPost.imageURL = downloadURL; //Dodaj sliku unutar prvog objekta koji smo stvorili, ovo ce se koristit za updateat Global stores i UI
            console.log("Third base passed")
            //CISTO ZA KASNIJE PONAVLJANJE Ovo doda novi post i spreada ga tako da mozemo napravit jos jedan novi objekt "id" isto vrijedi i za ispod state
            createPost({...newPost, id: postDocRef.id}); //Updateaj Global store posts
            addPost({...newPost, id: postDocRef.id}); //Updateaj Global store koji broji postove
            console.log("Fourth base passef")
            showToast("Success", "Post created successfully", "success");

        } catch (error) {
            showToast("Error", error.message, "error");

        } finally {
            setIsLoading(false);
        }
    }

    return {isLoading, handleCreatePost}



}

