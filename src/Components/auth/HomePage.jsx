import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { Box, Container, Tabs, TabList, Tab, TabPanels, TabPanel, Text } from '@chakra-ui/react'; // Correct imports
import Cookies from "js-cookie";

const HomePage = () => {


  const navigate = useNavigate();
  useEffect(() => {

          // const user = JSON.parse(sessionStorage.getItem("User"))
           const user = Cookies.get("homegate-token");
          // console.log(user)
          if (user) {
              navigate("/home")
          }
      
  }, [navigate])



  return (

    
    <div className='login-body'>
      <Container maxW="xl" centerContent minHeight="100vh" display="flex" flexDirection="column" justifyContent="center">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          
          p={3}
          bg={"white"}
          w="100%"
           mb="15px"
          // m="10px 0 15px 0 "
          borderRadius="lg"
          borderWidth="1px"
        >
        
          <Text fontSize="5xl" fontFamily="Work sans" >
          {process.env.REACT_APP_TILE}         
            
          </Text>
          
        </Box>
        <Box
        bg="white" 
        w="100%"
        // w={{ base: "90%", md: "60%", lg: "40%" }}
         p={4} borderRadius="lg" color="black" borderWidth="1px"
         overflowY="auto"
          maxHeight="80vh"
        >
          <Tabs variant='soft-rounded' >
  <TabList mb="1em">
    <Tab width="50%">SIGN IN</Tab>
    <Tab width="50%">SIGN UP</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <SignIn/>
    </TabPanel>
    <TabPanel>
    <SignUp/>
    </TabPanel>
  </TabPanels>
</Tabs>

        </Box>
        
      </Container>
</div>
  
  )
}

export default HomePage