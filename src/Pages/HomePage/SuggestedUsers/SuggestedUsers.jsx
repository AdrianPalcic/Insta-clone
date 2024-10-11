import { Flex, VStack, Text, Box } from "@chakra-ui/react"
import SuggestedHeader from "./SuggestedHeader"
import SuggestedUser from "./SuggestedUser"
import { Link } from "react-router-dom"

const SuggestedUsers = () => {
  return (
    <VStack 
    py={8}
    px={6}
    gap={4}
    >
      <SuggestedHeader />
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
            <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
                Suggested for you
            </Text>
            <Text fontSize={12} fontWeight={"bold"} _hover={{color: "gray.400"}} cursor={"pointer"}>
                See All
            </Text>

        </Flex>
        <SuggestedUser name="Andrej Garfild" followers={42069} avatar="/andrew.jpeg" />
        <SuggestedUser name="Rajan Gosljin" followers={420} avatar="/gosling.webp" />
        <SuggestedUser name="Kristijan Bale" followers={69} avatar="/bale.webp" />
        <Box 
        textAlign={"start"}
        w={"full"}
         fontSize={12}
         color={"gray.500"}
         mt={5}
         
         >
            © Made By{" "}
            <Link href="#" target="_blank" className="color2" fontSize={14}>
            Adrian Palcic
            </Link>
         </Box>

    </VStack>
  )
}

export default SuggestedUsers