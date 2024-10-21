import { Flex, Box, Spinner } from "@chakra-ui/react"
import Sidebar from "./Sidebar/Sidebar"
import { useLocation } from "react-router-dom"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../Firebase/firebase";
import Navbar from "../../Components/Navbar/navbar";
const PageLayout = ({ children }) => {

    const {pathname} = useLocation();

    {/* Hook koji prati stanje autentikacije usera na firebaseu */}
    const [user, loading, error] = useAuthState(auth);

    {/* Iako ne mozemo na homepage ako user nije ulogiran i dalje se na sekundu rendera sidebar, ovo taj problem rijesava */}
    const canRenderSidebar = pathname !== "/auth" && user;

    const canRenderNavbar = !user && !loading && pathname !== "/auth"

    const checkingUserAuth = !user && loading
    if (checkingUserAuth) return <PagelayoutSpinner />

  return (
   <Flex flexDir={canRenderNavbar ? "column" : "row"}>
    {/* sidebar left */}
 {canRenderSidebar ? (
    <Box w={{base:"70px", md:"240px"}}>
    <Sidebar />
    </Box>
   ) : null}
   {/* Navbar */}
   {canRenderNavbar ? <Navbar /> : null}
    {/* The page Content right */}
    <Box flex={1} w={{base:"calc(100% - 70px", md: "calc(100% - 240px)"}} mx={"auto"}> 
        {children}
    </Box>
   </Flex>
  )
}

export default PageLayout;

const PagelayoutSpinner = () => {
  return (
    <Flex flexDir={"column"} h={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Spinner size="x1" />
    </Flex>
  )
}