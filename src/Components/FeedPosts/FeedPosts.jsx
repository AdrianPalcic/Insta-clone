import { Container, Skeleton, SkeletonCircle, VStack, Flex, Box, Text } from '@chakra-ui/react'
import FeedPost from './FeedPost'
import useGetFeedPosts from '../../Hooks/useGetFeedPosts'

const FeedPosts = () => {

    const { isLoading, posts } = useGetFeedPosts();

    return (


        <Container maxW={"container.sm"} px={2}>
            {isLoading && [0, 1, 2, 3].map((_item, index) => (
                <VStack key={index} gap={4} alignItems={"flex-start"} mb={10}>
                    <Flex gap={2}>
                        <SkeletonCircle size={10} />
                        <VStack gap={2} alignItems={"flex-start"}>
                            <Skeleton height="10px" w={"200px"} />
                        </VStack>
                    </Flex>
                    <Skeleton w={"full"}>
                        <Box h={"500px"}>contents wrapped</Box>
                    </Skeleton>
                </VStack>
            ))}

            {!isLoading && posts.length > 0 && posts.map((post) => (
                <FeedPost key={post.id} post={post} />
            ))}
            {!isLoading && posts.length === 0 && (
                <>
                    <Text fontSize={"md"} color={"red.400"}>
                        Looks like you don't have any friends.
                    </Text>
                    <Text color={"red.400"}>Go make some</Text>
                </>
            )}

        </Container>
    )
}

export default FeedPosts;