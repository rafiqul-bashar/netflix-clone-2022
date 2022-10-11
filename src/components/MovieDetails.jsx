import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import Header from "./Header";

export default function MovieDetails() {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState("");
  const [muted, setMuted] = useState(true);
  const [playTrailer, setPlayTrailer] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { id } = useParams();
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  console.log(id);
  React.useEffect(() => {
    const loadData = async () => {
      const { data } = await axios(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
      );

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      setMovie(data);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Center h="full" w="full">
        <Spinner color="red.500" size="xl" />
      </Center>
    );
  }
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(25, 24, 24, 0.8), rgba(32, 30, 31, 1)), url(https://image.tmdb.org/t/p/w1280${
          movie?.backdrop_path ? movie?.backdrop_path : movie?.poster_path
        })`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        overflow: "auto",
      }}
    >
      <Center w="full">
        {/* Trailer Modal */}
        {/* 
        <Modal
          blockScrollOnMount={false}
          isOpen={isOpen}
          onClose={onClose}
          closeOnOverlayClick={true}
          size={["md", "xl"]}
        >
          <ModalOverlay
            bg="blackAlpha.400"
            backdropFilter="blur(10px) hue-rotate(90deg)"
          />
          <ModalContent>
            <ModalHeader bg="gray.800" color={"gray.100"}>
              {movie?.title + " - Watch Trailer"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody bg="black">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${trailer}`}
                width="100%"
                // height="100%"
                // style={{ position: "absolute", top: "0", left: "0" }}
                playing
                muted={muted}
              />
            </ModalBody>

            <ModalFooter bg="gray.800">
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal> */}

        <Flex flexDir="column" maxW={isMobile ? "" : "container.xl"}>
          <Box>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer}`}
              width="100%"
              // height="100%"
              // style={{ position: "absolute", top: "0", left: "0" }}
              playing
              muted={muted}
            />
          </Box>
          <Flex alignItems="start" flexDirection={isMobile ? "column" : ""}>
            <Image
              boxSize={["180px", "180px"]}
              p={2}
              objectFit="cover"
              my={[0, 12]}
              mx={isMobile ? "auto" : null}
              src={`https://image.tmdb.org/t/p/w500${
                movie?.backdrop_path ? movie?.backdrop_path : movie?.poster_path
              }`}
            />

            <Box flex="1" p={10}>
              <Heading size={isMobile ? "lg" : "2xl"} noOfLines={3}>
                {movie?.title}( {movie?.release_date?.split("-")[0]})
              </Heading>
              <Flex my={8} gap={isMobile ? 8 : 6}>
                <p>{movie?.vote_average} Average Vote</p>
                <a href={movie?.homepage} target="_blank">
                  <Text as="u">Go to homepage</Text>
                </a>
              </Flex>

              {/* <Button
                onClick={onOpen}
                // onClick={() => setPlayTrailer(true)}
                colorScheme="telegram"
              >
                Play Trailer
              </Button> */}
              <Flex my={2} gap={3}>
                {/* <Heading size="xs">Average Vote : {movie?.vote_average}</Heading> */}
                {movie?.genres?.map((el, index) => (
                  <Heading key={index} size="xs">
                    {el?.name}
                  </Heading>
                ))}
              </Flex>
              <Heading as="i" color="gray.100" size="sm">
                {movie?.tagline}
              </Heading>
              <Heading mt={4} size={isMobile ? "sm" : "md"}>
                Overview
              </Heading>
              <Text> {movie?.overview}</Text>
              <Flex gap={10}>
                {movie?.production_companies?.map((el, index) => (
                  <Box mt={5} key={index}>
                    <Heading size="sm">{el?.name}</Heading>
                    <Text size="xs">{el?.origin_country}</Text>
                  </Box>
                ))}
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Center>
      <Center w="full" h={"50px"} bg="blackAlpha.200">
        &copy; RafiQul Bashar
      </Center>
    </div>
  );
}
