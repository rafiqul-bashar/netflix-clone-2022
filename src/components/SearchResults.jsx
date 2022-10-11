import {
  Center,
  Container,
  SimpleGrid,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { movieState } from "../store/userSlice";
import Card from "./Card";

export default function SearchResults() {
  const movies = useSelector(movieState);
  const [isMobile] = useMediaQuery("(max-width: 480px)");

  return (
    <Container maxW="container.lg" bg={"blackAlpha.200"}>
      <SimpleGrid columns={isMobile ? 3 : 5} spacing={2}>
        {movies?.searched?.map((el, index) => (
          <Card key={index} movie={el} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
