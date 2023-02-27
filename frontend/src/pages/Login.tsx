import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../styles/Login.module.css';
import sunImage from '../assets/images/result.svg';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider,
  Heading,
  Image,
  Input,
  Flex,
  FormControl,
  useBreakpointValue,
  Text,
} from '@chakra-ui/react';
import { getUserLogin } from '../utils/api';
import { ILogin } from '../interfaces/ILogin';

export default function Login() {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({
    base: 'base',
    sm: 'sm',
    md: false,
    lg: false,
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [check, setCheck] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = useCallback(() => {
    const { rememberUser } = JSON.parse(localStorage.getItem('user') || '{}');

    if (rememberUser) {
      return navigate('/random-user');
    }

    localStorage.clear();
  }, [navigate]);

  useEffect(() => {
    handleLogin();
  }, []);

  useEffect(() => {
    const regex = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    setBtnDisabled(!(username.length >= 3 && password && regex.test(password)));
  }, [username, password]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userLogin: ILogin = await getUserLogin({ username, password } as ILogin);
      if (userLogin) {
        const userInfo = {
          username: userLogin.username,
          token: userLogin.token,
          rememberUser: check,
        };
        localStorage.setItem('user', JSON.stringify(userInfo));
        navigate('/random-user');
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <Flex bgColor={'#f5f5f5'} align='center' justify='center' h={'100vh'} w={'100vw'}>
      {isMobile ? null : <Flex w={'50vw'} h={'100vh'} direction='column' align='center' justify='center'>
        <Image src={sunImage} alt='Dan Abramov' />
      </Flex>}
      <FormControl
        as='form'
        h={'100vh'}
        w={ isMobile ? '100vw' : '50vw' }
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Card width={isMobile ? '90%' : '60%'} variant='elevated'>
          <CardHeader>
            <Heading size='xl'>LOGIN</Heading>
          </CardHeader>
          <Divider />

          <CardBody>
            <Input
              variant='filled'
              size='lg'
              width={isMobile ? '90%' : '80%'}
              margin='10px auto'
              placeholder='Nome de Usuário'
              onChange={({ target: { value } }) => setUsername(value)}
            />

            <Input
              variant='filled'
              type='password'
              size='lg'
              width={isMobile ? '90%' : '80%'}
              margin={'10px auto'}
              placeholder='Digite sua senha'
              onChange={({ target: { value } }) => setPassword(value)}
            />

            <Checkbox
              size='md'
              colorScheme='teal'
              onChange={({ target: { checked } }) => setCheck(checked)}
            >
              Manter-me conectado
            </Checkbox>

            {error && <Text textColor='red.500' fontWeight='900' mt={5}>Usuário ou Senha Inválidos</Text>}
          </CardBody>
          <Divider />
          <CardFooter>
            <Button
              colorScheme='teal'
              size='lg'
              margin='0 auto'
              width={isMobile ? '90%' : '80%'}
              type='submit'
              disabled={btnDisabled}
              onClick={handleSubmit}
            >
              Entrar
            </Button>
          </CardFooter>
        </Card>
      </FormControl>
    </Flex>
  );
}
