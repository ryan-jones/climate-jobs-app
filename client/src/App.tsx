import React from 'react';
import Home from './pages/Home';
import {
  ChakraProvider,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
} from '@chakra-ui/react';
import treeImg from './assets/tree.jpg';

const App = () => {
  return (
    <ChakraProvider>
      <Stack
        h="full"
        minH="100vh"
        id="app-container"
        backgroundColor={'#F4EDE0'}
      >
        <Flex w="100%" p={8} justify="space-between" backgroundColor={'white'}>
          <HStack spacing={4} alignItems="flex-end">
            <Image
              boxSize="100px"
              objectFit="cover"
              src={treeImg}
              alt="tree logo"
            />
            <Heading as="h1">Climate Jobs</Heading>
          </HStack>
        </Flex>
        <Home />
      </Stack>
    </ChakraProvider>
  );
};

export default App;
