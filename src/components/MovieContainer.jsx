import { Box, Container, SimpleGrid, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

import requests from "../utils/apiRequests";
import MovieSlider from "./MovieSlider";

export default function MovieContainer() {
  const [isMobile] = useMediaQuery("(max-width: 480px)");

  return (
    <Box h="100vh" className="sliderContainer" overflowY="auto" bg="#111">
      <Container minW={isMobile ? "container.sm" : "container.xl"}>
        <SimpleGrid columns={1} spacing={2}>
          <MovieSlider
            title={"NetFlix Originals"}
            fetchUrl={requests.fetchNetflixOriginals}
            isLarge={true}
          />
          <MovieSlider title={"Top Rated"} fetchUrl={requests.fetchTopRated} />
          <MovieSlider
            title={"Trending Now"}
            fetchUrl={requests.fetchTrending}
          />
          <MovieSlider
            title={"Action Movies"}
            fetchUrl={requests.fetchActionMovies}
          />
          <MovieSlider
            title={"Comedy Movies "}
            fetchUrl={requests.fetchComedyMovies}
          />
          <MovieSlider
            title={"Horror Movies"}
            fetchUrl={requests.fetchHorrorMovies}
          />
          <MovieSlider
            title={"Romance Movies"}
            fetchUrl={requests.fetchRomanceMovies}
          />
          <MovieSlider
            title={" Documentries"}
            fetchUrl={requests.fetchDocumentries}
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
}
