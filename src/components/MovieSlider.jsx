import { Box, Flex, Heading, Image, useMediaQuery } from "@chakra-ui/react";
import React from "react";

import requests from "../utils/apiRequests";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MovieSlider({ title, fetchUrl, isLarge = false }) {
  const [movies, setMovies] = React.useState([]);
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  const baseUrl = "https://image.tmdb.org/t/p/original";
  const navigate = useNavigate();
  React.useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(fetchUrl);
      setMovies(data?.results);
      return data;
    };
    fetchData();
  }, [fetchUrl]);

  return (
    <Box className="slider" p={2} color={"white"}>
      <Heading my={2} size="md">
        {title}
      </Heading>

      <Flex p={2} className="slider" overflowX={"scroll"}>
        {movies?.map((movie, index) => (
          <Image
            onClick={() => navigate(`${movie?.id}`)}
            className="poster"
            key={index}
            objectFit="contain"
            maxH={isLarge ? "250px" : "100px"}
            mr={10}
            w="full"
            src={`${baseUrl}${
              isLarge ? movie?.poster_path : movie?.backdrop_path
            }`}
            alt={movies?.title}
          />
        ))}
      </Flex>
    </Box>
  );
}
