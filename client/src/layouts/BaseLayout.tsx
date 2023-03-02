import { Flex, HStack, Image, Heading, Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import treeImg from '../assets/tree.svg';

interface BaseLayoutProps {
  children: ReactNode;
}
const BaseLayout = ({ children }: BaseLayoutProps) => (
  <Box height="100vh" id="app-container" border="1px solid black">
    <Flex
      width="100%"
      px={8}
      py={4}
      justify="space-between"
      backgroundColor={'white'}
      boxShadow={'0 1px 4px 0 rgba(0,0,0,0.4)'}
      position="relative"
      zIndex={10}
    >
      <nav>
        <HStack spacing={2} alignItems="flex-end">
          <Image boxSize="50px" src={treeImg} alt="tree logo" />
          <Heading as="h1">Climatica</Heading>
        </HStack>
      </nav>
    </Flex>

    {children}
  </Box>
);

export default BaseLayout;
