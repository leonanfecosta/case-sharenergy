import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Divider,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Links = [
  {
    name: 'Random User',
    to: '/random-user',
  },
  { name: 'HTTP Cats', to: '/http-cats' },
  {
    name: 'Random Dog',
    to: '/random-dog',
  },
  {
    name: 'Users',
    to: '/users',
  },
];

const NavLink = ({ children, to }: { children: ReactNode; to: string }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    fontSize={'lg'}
    fontFamily={'roboto'}
    textTransform={'uppercase'}
    _hover={{
      textDecoration: 'none',
      bg: 'teal.400',
      textColor: 'white',
      fontWeight: 'bold',
    }}
    href={to}
  >
    {children}
  </Link>
);

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  return (
    <>
      <Box px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink to={link.to} key={link.name}>
                  {link.name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              px={6}
              py={2}
              fontFamily={'roboto'}
              fontSize={'md'}
              textTransform={'uppercase'}
              onClick={() => {
                localStorage.removeItem('user');
                navigate('/login');
              }}
            >
              Sair
            </Button>
          </Flex>
        </Flex>
        <Divider />

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink to={link.to} key={link.name}>
                  {link.name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
