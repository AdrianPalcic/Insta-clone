import {  Box, Flex, Tooltip, Button } from "@chakra-ui/react"
import { Link, Link as RouterLink} from "react-router-dom"
import { InstagramLogo, InstagramMobileLogo} from "../../../assets/Contants"
import { BiLogOut } from "react-icons/bi"
import useLogout from "../../../Hooks/useLogout"
import useAuthStore from "../../../store/authStore"
import SidebarItems from "./SidebarItems"


const Sidebar = () => {




       const {handleLogout, isLoggingOut} = useLogout();


  return (
    <Box height={"100vh"} 
    borderRight={"1px solid"}
     borderColor={"whiteAlpha.500"}
     py={8}
     position={"sticky"}
     top={0}
     left={0}
     px={{base:2,ms:4}}
     >

        <Flex direction={"column"} gap={10} w={"full"} height={"full"}>
            <Box display={{ base: "none", md: "block" }} pl={2} cursor="pointer">
        <Link to={"/"} as={RouterLink}>
                <InstagramLogo />
            </Link>
            </Box>

            <Box display={{ base: "block", md: "none" }} p={4} cursor="pointer" borderRadius={6} _hover={{ bg: "whiteAlpha.200" }} w={"full"}>
            <Link to={"/"} as={RouterLink}>
                <InstagramMobileLogo />
</Link>
  </Box>
    <Flex direction={"column"} gap={6} cursor={"pointer"}>
        <SidebarItems />
    </Flex>

        {/* LOGOUT */}

    <Tooltip
       
           label={"Logout"}
           hasArrow
           placement="right"
           ml={1}
           openDelay={400}
           display={{base: "block", md: "none"}}

           >
            <Flex
                alignItems={"center"}
                gap={2}
                _hover={{bg: "whiteAlpha.400"}}
                w={"full"}
                className="pleaseHelp margin"
                justifyContent={"flex-start"}
                onClick={handleLogout}
                borderRadius={6}
                cursor={"pointer"}
            >
                {<BiLogOut size={25} />}
                <Button display={{base: "none", md: "block"}}
                variant={"ghost"}
                _hover={{bg: "transparent"}}
                isLoading={isLoggingOut}
                >
                    Logout
                </Button>
            </Flex>
            
           </Tooltip>
        </Flex>
    </Box>
  )
}

export default Sidebar