import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import axios from "axios";

import React from "react";
import { useNavigate } from "react-router-dom";

import requests from "../utils/apiRequests";

export default function Hero() {
  const [movie, setMovie] = React.useState([]);
  const navigate = useNavigate();
  React.useLayoutEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        data?.results[Math.floor(Math.random() * data?.results?.length - 1)]
      );
    };
    fetchData();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(25, 24, 24, 0.7), rgba(32, 30, 31, 0.8)), url(https://image.tmdb.org/t/p/w1280${movie?.backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <Box w="full" h="448px" color="white" objectFit="contain">
        <Center w="full" h="400px" color="white">
          {" "}
          <Flex flexDir="column" gap={4} px={[3, 10]} maxW={"container.xl"}>
            <Heading size="2xl" my={3}>
              {movie?.title}
            </Heading>
            <Flex gap={3}>
              <Button
                onClick={() => navigate(`/${movie?.id}`)}
                _hover={{ bg: "#e6e6e6", color: "#000" }}
                bg="#111"
                color="gray.200"
              >
                Play
              </Button>
              <Button
                _hover={{ bg: "#e6e6e6", color: "#000" }}
                bg="#111"
                color="gray.200"
              >
                My List
              </Button>
            </Flex>
            <Text>{movie?.overview}</Text>
          </Flex>
        </Center>
      </Box>{" "}
    </div>
  );
}
