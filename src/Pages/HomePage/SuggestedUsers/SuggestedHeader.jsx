import { Avatar, Flex, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"


const SuggestedHeader = () => {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
        <Flex alignItems={"center"} gap={2}>
            <Avatar name="Adrian Palcic" size={"lg"} src="/profilepic.png" />
            <Text fontSize={12} fontWeight={"bold"}>
                Adrian
            </Text>
        </Flex>
        <Link
         to={"/auth"}
         fontSize={14}
         fontWeight={"medium"}
         cursor={"pointer"}
         color={"blue.400"}
         className="color"
         
         >
            Log out
        </Link>
    </Flex>
  )
}

export default SuggestedHeader