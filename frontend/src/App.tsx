import './App.css';
import Approutes from './routes/routes';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <div className='App'>
      <ChakraProvider>
        <Approutes />
      </ChakraProvider>
    </div>
  );
}

export default App;
