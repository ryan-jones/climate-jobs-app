import React from 'react';
import Home from './pages/LandingPage';
import { ChakraProvider } from '@chakra-ui/react';
import BaseLayout from './layouts/BaseLayout';

const App = () => {
  console.log('app is loading');
  return (
    <ChakraProvider>
      <BaseLayout>
        <Home />
      </BaseLayout>
    </ChakraProvider>
  );
};

export default App;
