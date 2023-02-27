import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { ChakraProvider } from '@chakra-ui/react';

const App = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/jobs`
        );
        const data = await response.json();
        console.log('data', data);
      } catch (err) {
        console.log(err);
      }
    };
    init();
  }, []);

  return (
    <ChakraProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </ChakraProvider>
  );
};

export default App;
