import { Flex, Spinner } from '@chakra-ui/react';

export default function Loading() {
  return (
    <Flex justify='center' align='center' height='100vh' width='100%' direction='column'>
      <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='teal' size='xl' />
    </Flex>
  );
}
