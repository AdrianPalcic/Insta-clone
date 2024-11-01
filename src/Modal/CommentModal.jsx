import {
    Button,
    Flex,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import Comment from "../Components/Comment/Comment";
import usePostComment from "../Hooks/usePostComment";
import { useEffect, useRef } from "react";

const CommentsModal = ({ isOpen, onClose, post }) => {
    const { handlePostComment, isCommenting } = usePostComment();
    const commentRef = useRef(null);
    const commentsContainerRef = useRef(null);

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        await handlePostComment(post.id, commentRef.current.value);
        commentRef.current.value = "";
    }

    useEffect(() => {
        const scrollToBottom = () => {
            commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
        };
        if (isOpen) {
            setTimeout(() => {
                scrollToBottom();
            }, 100)
        }
    }, [isOpen, post.comments.length])

    return (
        <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
            <ModalOverlay />
            <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
                <ModalHeader>Comments</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Flex mb={4} gap={4} flexDir={"column"} maxH={"250px"} overflowY={"auto"} ref={commentsContainerRef}>
                        {post.comments.map((comment, index) => (
                            <Comment key={index} comment={comment} />
                        ))}
                    </Flex>
                    <form style={{ marginTop: "2rem" }} onSubmit={handleSubmitComment}>
                        <Flex w={"full"} justifyContent={"flex-end"}>
                            <Input placeholder='Comment' size={"sm"} variant={"flushed"} flex={1} ref={commentRef} />
                            <Flex justifyContent={"flex-end"} ml={4}>
                                <Button type='submit' ml={"auto"} size={"sm"} my={2} isLoading={isCommenting}>
                                    Post
                                </Button>
                            </Flex>
                        </Flex>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CommentsModal;