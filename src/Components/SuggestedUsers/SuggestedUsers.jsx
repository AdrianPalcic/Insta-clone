import { Flex, VStack, Text, Box, SkeletonCircle, Skeleton } from "@chakra-ui/react"
import SuggestedHeader from "./SuggestedHeader"
import SuggestedUser from "./SuggestedUser";
import { Link } from "react-router-dom";
import useGetSuggestedUsers from "../../Hooks/useGetSuggestedUsers";

const SuggestedUsers = () => {

  const { isLoading, suggestedUsers } = useGetSuggestedUsers();

  return (
    <VStack 
      py={8}
      px={6}
      gap={4}
    >
      <SuggestedHeader />
      {isLoading && <UserSkeleton />}
      {!isLoading && (
        <>
          {suggestedUsers.length !== 0 && (
            <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
              <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
                Suggested for you
              </Text>
              <Text fontSize={12} fontWeight={"bold"} _hover={{ color: "gray.400" }} cursor={"pointer"}>
                See All
              </Text>
            </Flex>
          )}
          
          {suggestedUsers.map((user) => {
            return <SuggestedUser  key={user.id} user={user} />
          })}
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
        </>
      )}
    </VStack>
  )
}

export default SuggestedUsers

const UserSkeleton = () => {
  return (
  <VStack w={"full"} mt={5} gap={2}>
  {[0,1,2,3,4].map((_item, index) => (
    <Flex alignItems={"center"} justifyContent={"flex-start"} gap={2} w={"full"} mt={1} key={index}>
    <SkeletonCircle size={"14"} />
    <Flex flexDir={"column"} justifyContent={"center"} gap={4} alignItems={"flex-start"}>
      <Skeleton height="6px" width="100px" />
      <Skeleton height="6px" width="60px" />
    </Flex>
  </Flex>
  ))}
  </VStack>
  )
}