import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Card({ movie }) {
  const navigate = useNavigate();

  const handleNav = () => {
    navigate(`/${movie?.id}`);
  };
  const [isMobile] = useMediaQuery("(max-width: 480px)");

  return (
    <Box minW={isMobile ? "110px" : "160px"} onClick={handleNav}>
      <Flex
        gap={2}
        flexDirection="column"
        _hover={{ scale: "1.1", cursor: "pointer" }}
        p={2}
        rounded="md"
      >
        <Image
          mx="auto"
          w="155px"
          h="225px"
          rounded="sm"
          src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
        />

        <Heading as="h4" size="16px" noOfLines={3}>
          {movie?.title
            ? movie?.title
            : movie?.original_name || movie?.original_title}
        </Heading>

        <Text as="h6" size="xs" noOfLines={1}>
          {movie?.release_date}
        </Text>
        <Text as="h6" size="xs" noOfLines={1}>
          lang: {movie?.original_language}
        </Text>

        {/* <Text>
        After his retirement is interrupted by Gorr the God Butcher, a galactic
        killer who seeks the extinction of the gods, Thor Odinson enlists the
        help of King Valkyrie, Korg, and ex-girlfriend Jane Foster, who now
        wields Mjolnir as the Mighty Thor.{" "}
      </Text> */}
      </Flex>
    </Box>
  );
}
