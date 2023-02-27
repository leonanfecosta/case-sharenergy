import { useState, useEffect, useCallback } from 'react';
import { EditIcon, DeleteIcon, Search2Icon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  useDisclosure,
  Avatar,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Input,
} from '@chakra-ui/react';
import ModalComp from '../components/ModalComp';
import { IUser } from '../interfaces/IUser';
import { getUsers, deleteUser } from '../utils/api';
import Header from '../components/Header';

export default function Users() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState<IUser[]>([]);
  const [dataEdit, setDataEdit] = useState({});
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [showFilteredUsers, setShowFilteredUsers] = useState(false);

  const fetchUsers = useCallback(async () => {
    const users = await getUsers();

    setData(users);
  }, []);

  useEffect(() => {
    if (search.length === 0) setShowFilteredUsers(false);

    fetchUsers();
  }, [fetchUsers, isOpen, search, onClose]);

  const handleRemove = async (_id: string) => {
    await deleteUser(_id);
    fetchUsers();
  };

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setShowFilteredUsers(true);

    const filteredUsers = data.filter((user: IUser) =>
      user.name.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredUsers(filteredUsers);
  };

  const allUser = showFilteredUsers ? (filteredUsers as IUser[]) : (data as IUser[]);

  return (
    <>
      <Header />
      <Flex h='100vh' align='center' justify='center' fontSize='20px'>
        <Box maxW={1200} w='100%' h='100vh' py={5} px={2}>
          <Flex justify='center' wrap='wrap' align='center' gap={5} mt={2} mb={2}>
            <Flex justify='center' wrap='wrap' align='center' gap={2} mt={1} mb={1}>
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
                disabled={search.length === 0}
                onClick={handleSearch}
                textTransform='uppercase'
              >
                Pesquisar
              </Button>
            </Flex>
            <Button
              colorScheme='teal'
              onClick={() => [setDataEdit({}), onOpen()]}
              textTransform='uppercase'
            >
              Novo Cadastro
            </Button>
          </Flex>
          <Flex justify='center' wrap='wrap' align='center' mt={6} gap='20px'>
            {allUser.length === 0 ? <Heading mt={52}>Nenhum usuário encontrado</Heading> : allUser.map(({ name, email, phone, address, cpf, _id }) => (
              <Card
                key={_id}
                maxW={'320px'}
                w={'full'}
                h={'450px'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}
                cursor='pointer'
                variant='filled'
              >
                <CardBody>
                  <Avatar size={'xl'} src={'invalid url'} name={name} mb={4} />
                  <Stack mt='1' spacing='1' display='flex' justify='center' align='center'>
                    <Heading mb={2}>{name}</Heading>
                    <Text fontSize='sm' color='gray.600 '>
                      E-mail: {email}
                    </Text>
                    <Text fontSize='sm' color='gray.600 '>
                      Telefone: {phone}
                    </Text>
                    <Text fontSize='sm' color='gray.600 '>
                      Endereço: {address}
                    </Text>
                    <Text fontSize='sm' color='gray.600 '>
                      CPF: {cpf}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter display='flex' alignItems='center' justifyContent='center' mt={2}>
                  <ButtonGroup size='sm' variant='outline' spacing={8}>
                    <EditIcon
                      fontSize={20}
                      onClick={() => [
                        setDataEdit({ name, email, phone, address, cpf, _id } as IUser),
                        onOpen(),
                      ]}
                    />
                    <DeleteIcon fontSize={20} onClick={() => handleRemove(_id as string)} />
                  </ButtonGroup>
                </CardFooter>
              </Card>
            ))}
          </Flex>
        </Box>
        {isOpen && (
          <ModalComp
            isOpen={isOpen}
            onClose={onClose}
            data={data}
            dataEdit={dataEdit as IUser}
            fetchUsers={fetchUsers}
          />
        )}
      </Flex>
    </>
  );
}
