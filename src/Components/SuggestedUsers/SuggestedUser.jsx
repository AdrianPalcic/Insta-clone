import { Flex, Button, Avatar, VStack, Box } from "@chakra-ui/react"
import useFollowUser from "../../Hooks/useFollowUser"
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";


const SuggestedUser = ({user, setUser}) => {

  const {isUpdating, isFollowing, handleFollowUser} = useFollowUser(user.uid);
  const authUser = useAuthStore((state) => state.user);

  const onFollowUser = async() => {
    await handleFollowUser();

    //Zato sto user kojeg mi dobivamo uzme dokument i to je static, te ga moramo ovako nadodat. Nas state prati followerse za usera unutar authStore i setUserProfile, a ne od podataka koje dobivamo za trazilicu
    setUser({...user,
      followers: isFollowing ? user.followers.filter(uid => uid !== authUser.uid) : [...user.followers, authUser]
    })
  }

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Link to={`/${user.username}`}>
        <Avatar src={user.profilePicURL} name={user.username} size={"md"}/>
        </Link>
        <VStack spacing={2} alignItems={"flex-start"}>
        <Link to={`/${user.username}`}>
          <Box fontSize={12} fontWeight={"bold"} >
            {user.username}
          </Box>
        </Link>
          <Box fontSize={11} fontWeight={"gray.500"} >
            {user.followers.length} followers
          </Box>
        </VStack>
      </Flex>
     {authUser.uid !== user.uid && (
       <Button 
       fontSize={13}
       bg={"transparent"}
       p={0}
       h={"max-content"}
       fontWeight={"medium"}
       color={"blue.400"}
       cursor={"pointer"}
       _hover={{
         color: "white"
       }}
       onClick={onFollowUser}
         isLoading={isUpdating}
       >
         {isFollowing ? "UnFollow" : "Follow"}
       </Button>
     )}
    </Flex>
  )
}

export default SuggestedUser