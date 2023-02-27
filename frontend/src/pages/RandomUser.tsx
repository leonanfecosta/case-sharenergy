import { useCallback, useEffect, useState } from 'react';
import { fetchRandomUser, fetchAllRandomUsers } from '../utils/services';
import { Card, CardBody } from '@chakra-ui/card';
import {
  Avatar,
  Button,
  ButtonGroup,
  Heading,
  Flex,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Search2Icon, ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import { IRandomUsers } from '../interfaces/IRandomUsers';
import Header from '../components/Header';
import Loading from '../components/Spinner';

export default function RandomUser() {
  const [users, setUsers] = useState<IRandomUsers[]>([]);
  const [allUsers, setAllUsers] = useState<IRandomUsers[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<IRandomUsers[]>([]);
  const [showFilteredUsers, setShowFilteredUsers] = useState(false);

  const fetchRandomUsers = useCallback(async () => {
    const url = `https://randomuser.me/api/?page=${page}&results=3&seed=abc&inc=name,email,picture,dob,login`;
    const users = await fetchRandomUser(url);

    setUsers(users);
    setLoading(false);
  }, [page]);

  const AllRandomUsers = useCallback(async () => {
    const users = await fetchAllRandomUsers();

    setAllUsers(users);
    setLoading(false);
  }, [setAllUsers]);

  useEffect(() => {
    if (search.length === 0) setShowFilteredUsers(false);

    fetchRandomUsers();
    AllRandomUsers();
  }, [fetchRandomUsers, search, AllRandomUsers]);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setShowFilteredUsers(true);

    const filteredUsers = allUsers.filter(
      (user: IRandomUsers) =>
        user.name.first.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.login.username.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredUsers(filteredUsers);
  };

  const allUser = showFilteredUsers ? (filteredUsers as IRandomUsers[]) : (users as IRandomUsers[]);

  return (
    <div>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <section>
          <Flex justify='center' wrap='wrap' align='center' gap={5} mt={5} mb={5}>
            <Input
              variant='Filled'
              placeholder='Buscar usuário'
              width='72'
              bgColor={'blackAlpha.200'}
              onChange={({ target: { value } }) => setSearch(value)}
            />

            <Button
              leftIcon={<Search2Icon color='white.500' />}
              colorScheme={'teal'}
              onClick={handleSearch}
            >
              Pesquisar
            </Button>
          </Flex>

          <Flex justify='center' wrap='wrap' align='center' gap={4}>
            {allUser.length === 0 ? <Heading mt={52}>Nenhum usuário encontrado</Heading> : allUser?.map((user: IRandomUsers) => (
              <Card
                key={user.login.uuid}
                maxW={'400px'}
                w={'full'}
                h={'390px'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}
                cursor='pointer'
                mt={5}
                variant='filled'
              >
                <CardBody>
                  <Avatar
                    size={'2xl'}
                    src={user.picture.large}
                    name={`${user.name.first} ${user.name.last}`}
                    mb={4}
                  />
                  <Stack mt='4' spacing='1'>
                    <Heading size='xl'>{`${user.name.first} ${user.name.last}`}</Heading>
                    <Text fontSize='lg'>Email: {user.email}</Text>
                    <Text fontSize='xl'>Nome de Usuário: {user.login.username}</Text>
                    <Text fontSize='xl'>Idade: {user.dob.age}</Text>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </Flex>

          <div>
            {search.length === 0 && (
              <ButtonGroup spacing='6' mt={5} mb={10}>
                <Button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  colorScheme={'teal'}
                >
                  <ArrowLeftIcon />
                </Button>

                <Button onClick={() => setPage(page + 1)} colorScheme={'teal'}>
                  <ArrowRightIcon />
                </Button>
              </ButtonGroup>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
