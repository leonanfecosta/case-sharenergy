import { CardFooter, Divider, Heading, Image, Select, Card, CardBody } from '@chakra-ui/react';
import { statusCodes, statusCatCodes } from '../utils/httpCodes';
import { useState } from 'react';
import Header from '../components/Header';
import notFound from '../assets/images/404-error.svg';

export default function HTTPCats() {
  const [status, setStatus] = useState('200');
  const [error, setError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    if (!statusCatCodes.includes(event.target.value)) {
      setError(true);
    } else {
      setError(false);
    }
    setStatus(event.target.value);
  };
  return (
    <div className='App'>
      <Header />
      <div
        style={{
          margin: '20px',
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card maxW='lg' variant='filled'>
          <CardBody>
            {error ? (
              <Image src={notFound} width={'100%'} margin='0 auto' />
            ) : (
              <Image
                src={`https://http.cat/${status}`}
                alt='HTTP Cat'
                borderRadius='lg'
                height={400}
                width={'100%'}
              />
            )}
          </CardBody>
          <Divider />
          <CardFooter justifyContent='space-around' alignItems='center'>
            <Heading as='h3' size='md' textAlign='center' justifyContent='center'>
              Selecione um código{' '}
            </Heading>

            <Select
              variant='filled'
              width='35%'
              placeholder='HTTP Codes'
              textAlign='center'
              onChange={handleChange}
            >
              {statusCodes.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </Select>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
