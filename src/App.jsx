import { Box, Container, Heading } from "@chakra-ui/react";
import MovieContainer from "./components/MovieContainer";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import Hero from "./components/Hero";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "./components/Login";
import Header from "./components/Header";
import { loginUser, logOutUser, userStatus } from "./store/userSlice";
import { useEffect, useLayoutEffect } from "react";

const Home = () => {
  const user = useSelector(userStatus);
  const navigate = useNavigate();
  const auth = getAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?.uid) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(loginUser(user));
      } else {
        dispatch(logOutUser());
      }
    });
  }, [navigate]);

  return (
    <Box h="full" bg="#111">
      <Hero />
      <MovieContainer />
    </Box>
  );
};
const SingleMovie = () => {
  const user = useSelector(userStatus);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.uid) {
      navigate("/login");
    }
  }, [user?.uid]);

  return (
    <Box h="100vh" color="white">
      <MovieDetails />
    </Box>
  );
};

const Profile = () => {
  return (
    <Box h="100vh" color="white">
      <Container maxW="container.md">
        <Heading mb={4}>Edit Profile</Heading>
      </Container>
    </Box>
  );
};

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<SingleMovie />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
