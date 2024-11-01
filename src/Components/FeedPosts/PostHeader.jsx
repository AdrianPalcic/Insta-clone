import { Avatar, Box, Button, Flex } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import useFollowUser from "../../Hooks/useFollowUser"
import { timeAgo } from "../../utilities/timeAgo";

const PostHeader = ({ post, creatorProfile }) => {

    const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(post.createdBy);

    if (!creatorProfile) return ""

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
            <Flex alignItems={"center"} gap={2}>
                <Link to={`/${creatorProfile.username}`}>
                    <Avatar src={creatorProfile.profilepicURL} alt="user profile pic" size={"sm"} />
                </Link>
                <Flex fontSize={12} fontWeight={"bold"} gap={2}>
                    <Link to={`/${creatorProfile.username}`}>
                        {creatorProfile.username}
                    </Link>
                    <Box color={"gray.500"}>
                        {timeAgo(post.createdAt)}
                    </Box>
                </Flex>
            </Flex>
            <Box
                cursor={"pointer"}
            >
                <Button
                    size={"xs"}
                    bg={"transparent"}
                    fontSize={12}
                    color={"blue.500"}
                    fontWeight={"bold"}
                    _hover={{
                        color: "white"
                    }}
                    transition={"0.2s ease-in-out"}
                    onClick={handleFollowUser}
                    isLoading={isUpdating}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </Button>
            </Box>
        </Flex>
    );
}




export default PostHeader