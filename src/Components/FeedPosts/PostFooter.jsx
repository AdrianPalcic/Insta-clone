import { Flex, Text, Box, InputGroup, Input, InputRightElement, Button, useDisclosure } from "@chakra-ui/react"
import { useRef, useState } from "react";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/Contants";
import usePostComment from "../../Hooks/usePostComment";
import useLikePost from "../../Hooks/useLikePost";
import { timeAgo } from "../../utilities/timeAgo";
import CommentsModal from "../../Modal/CommentModal";

const PostFooter = ({ post, isProfilePage, creatorProfile }) => {

    const { isCommenting, handlePostComment } = usePostComment();
    const [comment, setComment] = useState("");
    const commentRef = useRef(null);
    const { handleLikePost, isLiked, likes } = useLikePost(post);
    const { isOpen, onClose, onOpen } = useDisclosure()
    const handleSubmitComment = async () => {
        await handlePostComment(post.id, comment);
        setComment("");
    }



    return (
        <Box mb={10} marginTop={"auto"}>
            <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
                <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
                    {!isLiked ? (<NotificationsLogo />) : (<UnlikeLogo />)}
                </Box>
                <Box cursor={"pointer"} fontSize={18} onClick={() => commentRef.current.focus()}>
                    <CommentLogo />
                </Box>
            </Flex>
            <Text fontWeight={600} fontSize={"sm"}>
                {likes} likes
            </Text>
            {isProfilePage && (
                <Text fontSize="12" color={"gray"}>
                    Posted {timeAgo(post.createdAt)}
                </Text>
            )}
            {!isProfilePage && (
                <>
                    <Text fontSize={"sm"} fontWeight={700}>
                        {creatorProfile?.username}{" "}
                        <Text as="span" fontWeight={400}>
                            {post.caption}
                        </Text>
                    </Text>
                    {post.comments.length > 0 && (
                        <Text fontSize={"sm"} color={"gray"} cursor={"pointer"} onClick={onOpen}>
                            View all {post.comments.length} comments
                        </Text>
                    )}
                    {/* Ovaj modal samo ako smo na HomePage */}
                    {isOpen ? <CommentsModal isOpen={isOpen} onClose={onClose} post={post} /> : null}
                </>
            )}

            <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={2}
                w={"full"}
            >
                <InputGroup>
                    <Input
                        variant={"flushed"}
                        placeholder={"Add a comment..."}
                        fontSize={14}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        ref={commentRef}
                    />
                    <InputRightElement>
                        <Button
                            fontSize={14}
                            color={"blue.500"}
                            fontWeight={600}
                            cursor={"pointer"}
                            _hover={{
                                color: "white"
                            }}
                            bg={"transparent"}
                            onClick={handleSubmitComment}
                            isLoading={isCommenting}
                        >Post</Button>
                    </InputRightElement>
                </InputGroup>
            </Flex>
        </Box>
    );
}

export default PostFooter