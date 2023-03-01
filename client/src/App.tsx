import React from 'react';
import Home from './pages/Home';
import { ChakraProvider } from '@chakra-ui/react';
import BaseLayout from './layouts/BaseLayout';

const App = () => {
  return (
    <ChakraProvider>
      <BaseLayout>
        <Home />
      </BaseLayout>
    </ChakraProvider>
  );
};

export default App;
