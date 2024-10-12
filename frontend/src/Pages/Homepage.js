import React, { useEffect } from 'react';
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text, IconButton } from "@chakra-ui/react";
import { FaGithub } from 'react-icons/fa'; // Import GitHub icon
import { useNavigate } from 'react-router-dom';
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

function Homepage() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) navigate("/chats");
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      {/* GitHub Button */}
      <Box position="absolute" top="10px" right="10px">
        <IconButton
          icon={<FaGithub />}
          aria-label="GitHub"
          fontSize="30px"
          onClick={() => window.open("https://github.com/adilnvm/mern-chat-app", "_blank")} // Change URL to your GitHub profile or project
          variant="ghost"
          color="white" // Default color of the GitHub icon
          _hover={{ color: "gray.400" }} // Hover effect to change icon color to light gray
        />
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans">
          Say It
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;
