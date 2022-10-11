import {
  Box,
  Flex,
  Button,
  useMediaQuery,
  Center,
  AbsoluteCenter,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userStatus } from "../store/userSlice";
import AuthPage from "./AuthPage";

export default function Login() {
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  const [signIn, setSignIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const user = useSelector(userStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.uid) {
      navigate("/");
    }
  }, [user]);

  return (
    <Box
      color="white"
      position="relative"
      h="100vh"
      w="full"
      backgroundImage="url('https://assets.nflxext.com/ffe/siteui/vlv3/afc06103-4d6a-4236-b496-34b671a7e9ba/fbd1c127-a844-4d37-a167-3950800cf57c/BD-en-20221003-popsignuptwoweeks-perspective_alpha_website_medium.jpg')"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <div className="loginBg">
        <Center h="80vh">
          {signIn ? (
            <AuthPage prevPageEmail={email} />
          ) : (
            <Box p={[1, 2]} maxW={"container.md"} textAlign="center">
              <Heading my={3} as="h1" size="3xl">
                Unlimited movies, TV shows, and more.{" "}
              </Heading>
              <Heading my={2} as="h2" size="lg">
                Watch anywhere. Cancel anytime.
              </Heading>

              <Heading my={3} as="h2" size="md">
                Ready to watch? Enter your email to create or restart your
                membership.
              </Heading>

              <Flex>
                <Input
                  size="xl"
                  bg="white"
                  color="gray.800"
                  focusBorderColor="transparent"
                  borderColor="white"
                  p={3}
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  value={email}
                  rounded="none"
                />
                <Button
                  onClick={() => setSignIn(true)}
                  size="xl"
                  px={4}
                  colorScheme="red"
                  rounded="none"
                >
                  Get Started
                </Button>
              </Flex>
            </Box>
          )}
        </Center>
      </div>
    </Box>
  );
}
