import { Container, Flex, VStack } from '@chakra-ui/react'
import { Box, Image } from '@chakra-ui/react'
import AuthForm from '../../Components/AuthForm/AuthForm'
const AuthPage = () => {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
        <Container maxW={"container.md"} padding={0}>

            <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
                {/*Left side image*/}
                <Box display={{base:"none", md:"block"}}>
                <Image src='/auth.png' h={650} alt="Phone img"/>
                </Box>

              {/*Right side Form*/}
              <VStack spacing={4} align={"stretch"}>
                <AuthForm />
                <Box textAlign={"center"}>
                    Get the App.
                </Box>
                <Flex gap={5} justifyContent={"center"}>
                    <Image cursor={"pointer"} src="/playstore.png" h={"10"} alt='playStore logo'></Image>
                    <Image cursor={"pointer"} src="/microsoft.png" h={"10"} alt='Microsoft logo'></Image>
                </Flex>
              </VStack>
            </Flex>
         
        </Container>
    </Flex>
  )
}

export default AuthPage