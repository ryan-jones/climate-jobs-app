import React from 'react';
import LandingPage from './pages/LandingPage';
import { ChakraProvider } from '@chakra-ui/react';
import BaseLayout from './layouts/BaseLayout';

const App = () => {
  return (
    <ChakraProvider>
      <BaseLayout>
        <LandingPage />
      </BaseLayout>
    </ChakraProvider>
  );
};

export default App;
