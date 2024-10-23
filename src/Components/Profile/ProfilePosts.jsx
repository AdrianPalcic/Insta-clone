import { Grid, Skeleton, VStack, Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ProfilePost from './ProfilePost';
const ProfilePosts = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500)
  }, [])

  return (
    <Grid
    templateColumns={{
      sm:"repeat(1, 1fr)",
      md:"repeat(3, 1fr)"
    }}
    gap={1} 
    columnGap={1}
    >
      {isLoading && [0,1,2,3,4,5].map((_item, index) => (
        <VStack key={index} alignItems={"flex-start"}>
          <Skeleton w={"full"}>
            <Box h="300px">contents wrapped</Box>
          </Skeleton>
        </VStack>
      ) )}
        {/* Ovo jos ne znam kako editat */}
      {!isLoading && (
        <>
        <ProfilePost img="/img1.png" />
        <ProfilePost img="/img2.png" />
        <ProfilePost img="/img3.png" />
        <ProfilePost img="/img4.png" />
        </>
      )}

    </Grid>
  )
}

export default ProfilePosts