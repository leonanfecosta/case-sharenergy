import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Image,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import Header from '../components/Header';
import Loading from '../components/Spinner';

export default function RandomDog() {
  const [dog, setDog] = useState(null);

  const fetchDog = useCallback(async () => {
    const res = await fetch('https://random.dog/woof.json?filter=mp4,webm');

    const data = await res.json();
    console.log(data);

    setDog(data.url);
  }, []);

  useEffect(() => {
    fetchDog();
  }, [fetchDog]);

  return (
    <div>
      <Header />
      {!dog ? (
        <Loading />
      ) : (
        <Flex
          direction='column'
          align='center'
          justify='center'
          m={5}
        >
          <Card maxW='lg' variant='filled'>
            <CardBody>
              <Image
                src={dog}
                alt='Green double couch with wooden legs'
                borderRadius='lg'
                height={400}
                width={'100%'}
              />
            </CardBody>
            <Divider />
            <CardFooter alignItems='center' justifyContent='center'>
                <Button
                  variant={'solid'}
                  colorScheme={'teal'}
                  size={'md'}
                  textTransform={'uppercase'}
                  onClick={fetchDog}
                >
                  Novo Dog
                </Button>
            </CardFooter>
          </Card>
        </Flex>
      )}
    </div>
  );
}
