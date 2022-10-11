import {
  Box,
  Heading,
  Input,
  Button,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import React from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/userSlice";
// import { loginUser } from "../store/userSlice";
export default function AuthPage({ prevPageEmail = "" }) {
  const [email, setEmail] = React.useState(prevPageEmail);
  const [password, setPassword] = React.useState("");
  const [show, setShow] = React.useState(false);
  const dispatch = useDispatch();
  const register = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch(loginUser(user));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

    setEmail("");
    setPassword("");
  };

  const signIn = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch(loginUser(user));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    setEmail("");
    setPassword("");
  };

  const guestLogin = () => {
    setEmail("guest@example.com");
    setPassword("MNI81800");
  };

  return (
    <div>
      <Box maxW={"480px"} p={[1, 12]} bg="#000000BF">
        <Heading my={4}>Sign In</Heading>
        <Box>
          <Input
            my={4}
            outline="none"
            rounded={"sm"}
            type={"email"}
            placeholder="Enter Email"
            bg="#333"
            color="gray.200"
            _placeholder={{ bg: "#333", color: "gray.400" }}
            focusBorderColor="#333"
            borderColor="#333"
            _hover={{ borderColor: "#333" }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <InputGroup size="md">
            <Input
              mb={7}
              rounded={"sm"}
              placeholder="Password"
              bg="#333"
              color="gray.200"
              _placeholder={{ bg: "#333", color: "gray.400" }}
              focusBorderColor="#333"
              borderColor="#333"
              _hover={{ borderColor: "#333" }}
              type={show ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <InputRightElement width="4.5rem">
              <Button
                variant={"ghost"}
                bg={"#333"}
                _hover={{ bg: "#333" }}
                h="1.75rem"
                size="sm"
                onClick={() => setShow(!show)}
              >
                {!show ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button onClick={() => signIn()} colorScheme="red" w="full">
            Sign In
          </Button>
          <Button
            variant="outline"
            mt={"3"}
            onClick={() => guestLogin()}
            w="full"
          >
            Guest Credentials
          </Button>

          <h2 style={{ marginTop: "18px", textAlign: "center" }}>
            {" "}
            <span style={{ color: "#737373", margin: "10px" }}>
              New to Netflix?
            </span>
            <button onClick={() => register()} variant="link">
              {" "}
              Sign up now.
            </button>
          </h2>
        </Box>
      </Box>
    </div>
  );
}
