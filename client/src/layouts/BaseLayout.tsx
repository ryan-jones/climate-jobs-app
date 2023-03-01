import { Flex, HStack, Stack, Image, Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';
import treeImg from '../assets/tree.jpg';

interface BaseLayoutProps {
  children: ReactNode;
}
const BaseLayout = ({ children }: BaseLayoutProps) => (
  <Stack h="full" minH="100vh" id="app-container" backgroundColor={'#F4EDE0'}>
    <Flex w="100%" p={8} justify="space-between" backgroundColor={'white'}>
      <HStack spacing={4} alignItems="flex-end">
        <Image boxSize="50px" objectFit="cover" src={treeImg} alt="tree logo" />
        <Heading as="h1">Climate Jobs</Heading>
      </HStack>
    </Flex>
    {children}
  </Stack>
);

export default BaseLayout;
