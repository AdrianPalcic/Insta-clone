import { Avatar, Button, Flex, Spinner, Text } from "@chakra-ui/react"
import useLogout from "../../Hooks/useLogout";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";
const SuggestedHeader = () => {

    const {handleLogout, isLoggingOut} = useLogout();
    const authUser = useAuthStore(state => state.user);

    if (!authUser) return <Spinner size={"xs"} />
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
        <Flex alignItems={"center"} gap={2}>
           <Link to={`/${authUser.username}`}>
            <Avatar size={"lg"} src={authUser.profilePicURL} />
          </Link>
           <Link to={`/${authUser.username}`}>
            <Text fontSize={12} fontWeight={"bold"}>
            {authUser.username}
            </Text>
          </Link>
        </Flex>


        <Button
         fontSize={14}
         fontWeight={"medium"}
         cursor={"pointer"}
         color={"blue.400"}
         className="color"
         size={"xs"}
         background={"transparent"}
         _hover={{background: "trasparent"}}
         onClick={handleLogout}
         isLoading={isLoggingOut}
         >
            Log out
        </Button>
    </Flex>
  )
}

export default SuggestedHeader