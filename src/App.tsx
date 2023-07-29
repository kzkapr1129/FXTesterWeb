import React from 'react';
import { Routers } from './router/Routers';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';

export const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Routers />
    </ChakraProvider>
  );
};
