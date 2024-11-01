import { Flex, VStack, Text, Box, SkeletonCircle, Skeleton, Button } from "@chakra-ui/react"
import SuggestedHeader from "./SuggestedHeader"
import SuggestedUser from "./SuggestedUser";
import { Link } from "react-router-dom";
import useGetSuggestedUsers from "../../Hooks/useGetSuggestedUsers";
import { useState } from "react";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../Hooks/useShowToast";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../../Firebase/firebase";

const SuggestedUsers = () => {

  const { isLoading, suggestedUsers } = useGetSuggestedUsers();
  const { isFetching, fetchAllUsers, allSuggestedUsers } = useFetchAllSuggestedUsers();
  const [seeAll, setSeeAll] = useState(false);
  const showToast = useShowToast();

  const handleFetchAll = async () => {
    if (suggestedUsers.length === allSuggestedUsers.length) return;
    try {
      await fetchAllUsers();
      setSeeAll(true);
    } catch (error) {
      showToast("Error", error.message, "error");
    }

  }

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
              <Button size={"sm"} fontSize={12} fontWeight={"bold"} _hover={{ color: "gray.400" }} cursor={"pointer"} onClick={handleFetchAll} variant={"ghost"} isLoading={isFetching}>
                See All
              </Button>
            </Flex>
          )}

          {!seeAll ? suggestedUsers.map((user) => {
            return <SuggestedUser key={user.id} user={user} />
          }) : allSuggestedUsers.map((user) => {
            return <SuggestedUser key={user.id} user={user} />
          })}
          <Flex
            textAlign={"start"}
            w={"full"}
            fontSize={12}
            color={"gray.500"}
            mt={5}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              © Made By{" "}
              <Link href="#" target="_blank" className="color2" fontSize={14}>
                Adrian Palcic
              </Link>
            </Box>
            {seeAll && <Button size={"sm"} fontSize={"12"} variant={"ghost"} onClick={() => setSeeAll(false)}>Close</Button>}
          </Flex>

        </>
      )}
    </VStack>
  )
}

export default SuggestedUsers

const UserSkeleton = () => {
  return (
    <VStack w={"full"} mt={5} gap={2}>
      {[0, 1, 2, 3, 4].map((_item, index) => (
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

//TRY TO MAKE THIS IN USEEffect for performance enhancement

function useFetchAllSuggestedUsers() {
  const [isFetching, setIsFetching] = useState(false);
  const [allSuggestedUsers, setAllSuggestedUsers] = useState([]);
  const authUser = useAuthStore(state => state.user);
  const showToast = useShowToast();

  const fetchAllUsers = async () => {
    if (isFetching) return;
    setIsFetching(true);

    try {

      const usersRef = collection(firestore, "users");
      const q = query(
        usersRef,
        where("uid", "not-in", [authUser.uid, ...authUser.following]),
        orderBy("uid"),
      );

      const querySnapshot = await getDocs(q);
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      })
      setAllSuggestedUsers(users);


    } catch (error) {
      showToast("Error", error.message, "error");
      setAllSuggestedUsers([]);

    } finally {
      setIsFetching(false);
    }
  }
  return { isFetching, fetchAllUsers, allSuggestedUsers }
}