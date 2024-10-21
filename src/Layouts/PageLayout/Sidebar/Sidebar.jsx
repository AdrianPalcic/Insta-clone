import { Avatar, Box, Flex, Tooltip, Text, Button } from "@chakra-ui/react"
import { Link, Link as RouterLink} from "react-router-dom"
import { CreatePostLogo, InstagramLogo, InstagramMobileLogo, NotificationsLogo, SearchLogo } from "../../../assets/Contants"
import { AiFillHome } from "react-icons/ai"
import { BiLogOut } from "react-icons/bi"
import useLogout from "../../../Hooks/useLogout"


const Sidebar = () => {

        const sidebaritems = [
            {
                icon: <AiFillHome size={25} />,
                text: "Home",
                link: "/",
            },
            {
                icon: <SearchLogo />,
                text:  "Search",
            },
            {
                icon: <NotificationsLogo />,
                text: "Notifications", 
            },
            {
                icon: <CreatePostLogo />,
                text: "Create",
            },
            {
                icon: <Avatar size={"sm"}  name="Adrian Palcic" src="/profilepic.png" />,
                text: "Profile",
                link: "/Adrian",
            },
        ];

       const {handleLogout, isLoggingOut, error} = useLogout();

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

            <Box display={{ base: "block", md: "none" }} p={4} cursor="pointer" borderRadius={6} _hover={{ bg: "whiteAlpha.200" }} w={10}>
            <Link to={"/"} as={RouterLink}>
                <InstagramMobileLogo />
</Link>
  </Box>
    <Flex direction={"column"} gap={6} cursor={"pointer"}>
        {sidebaritems.map((item, index) => (
           <Tooltip
           key={index}
           label={item.text}
           hasArrow
           placement="right"
           ml={1}
           openDelay={400}
           display={{base: "block", md: "none"}}

           >
            <Link
                display={"flex"}
                to={item.link || null }
                as={RouterLink}
                alignItems={"center"}
                gap={6}
                _hover={{bg: "whiteAlpha.400"}}
                p={4}
                w={{base: 10, md: "full"}}
                className="pleaseHelp"
                justifyContent={{base:"center", md:"flex-start"}}
            >
                {item.icon}
                <Box display={{base: "none", md: "block"}}>
                    {item.text}
                </Box>
            </Link>
            
           </Tooltip>
        ))}
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
                gap={6}
                _hover={{bg: "whiteAlpha.400"}}
                p={4}
                w={{base: 10, md: "full"}}
                className="pleaseHelp margin"
                justifyContent={{base:"center", md:"flex-start"}}
                onClick={handleLogout}
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