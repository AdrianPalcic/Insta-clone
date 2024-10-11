import { Container, Skeleton, SkeletonCircle, VStack, Flex, Box } from '@chakra-ui/react'
import FeedPost from './FeedPost'
import { useEffect, useState } from 'react'

const FeedPosts = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }, [])
  return (

   
    <Container maxW={"container.sm"} px={2}>
        {isLoading && [0,1,2,3].map((_item, index) => (
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
       
            {!isLoading && (
                <>
        <FeedPost img="/img1.png" username="Adrian" avatar="/img1.png"  />
        <FeedPost img="/img2.png" username="Franka" avatar="/img2.png"  />
        <FeedPost img="/img3.png" username="Palac" avatar="/img3.png"  />
        <FeedPost img="/img4.png" username="Nevisticka" avatar="/img4.png"  /> 
                </>
            )}
    </Container>
  )
}

export default FeedPosts;