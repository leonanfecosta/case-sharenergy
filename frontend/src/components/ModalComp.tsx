import { useState } from 'react';
import { IUser } from '../interfaces/IUser';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
} from '@chakra-ui/react';
import { createUser, updateUser } from '../utils/api';

interface ModalCompProps {
  data: IUser[];
  dataEdit: IUser;
  isOpen: boolean;
  onClose: () => void;
  fetchUsers: () => void;
}

export default function ModalComp({ data, dataEdit, isOpen, onClose, fetchUsers }: ModalCompProps) {
  const [name, setName] = useState(dataEdit.name || '');
  const [email, setEmail] = useState(dataEdit.email || '');
  const [phone, setPhone] = useState(dataEdit.phone || '');
  const [address, setAddress] = useState(dataEdit.address || '');
  const [cpf, setCpf] = useState(dataEdit.cpf || '');
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const regexPhone = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/;
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  const nameError = name !== '' && name.length < 3;
  const emailError = email !== '' && !regexEmail.test(email);
  const phoneError = phone !== '' && !regexPhone.test(phone);
  const adrressError = address !== '' && address.length < 5;
  const cpfError = cpf !== '' && !cpfRegex.test(cpf);

  const buttonDisabled = nameError || emailError || adrressError || cpfError;
  const emailAndCpfExists = () => {
    if (dataEdit?.email !== email && dataEdit?.cpf !== cpf && data?.length) {
      const emailExists = data.find((item) => item.email === email);
      const cpfExists = data.find((item) => item.cpf === cpf) as unknown as boolean;
      return emailExists || cpfExists;
    }
    return false;
  };

  const handleSave = () => {
    if (!name || !email || !phone || !address || !cpf) return;

    if (emailAndCpfExists()) {
      return alert('Email ou CPF já cadastrado');
    }

    if (Object.keys(dataEdit).length) {
      const user = { name, email, phone, address, cpf } as IUser;
      updateUser(dataEdit._id as string, user);
      fetchUsers();
      onClose();
      return;
    }

    const user = { name, email, phone, address, cpf } as IUser;
    createUser(user);
    fetchUsers();

    onClose();
  };

  const formatPhone = (phone: string) => {
    const phoneRegex = /^(\d{2})(\d{5})(\d{4}).*/;
    const phoneFormated = phone.replace(phoneRegex, '($1) $2-$3');
    return phoneFormated;
  };

  const formatCpf = (cpf: string) => {
    const cpfRegex = /^(\d{3})(\d{3})(\d{3})(\d{2}).*/;
    const cpfFormated = cpf.replace(cpfRegex, '$1.$2.$3-$4');
    return cpfFormated;
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textTransform='uppercase'>
            {Object.keys(dataEdit).length ? 'Editar' : 'Cadastrar'} Usuário{' '}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display='flex' flexDirection='column' gap={4}>
              <Box>
                <FormLabel>Nome</FormLabel>
                <Input
                  type='text'
                  value={name}
                  placeholder='Seu nome'
                  onChange={(e) => setName(e.target.value)}
                />
                {nameError && <Text color='red'>Nome deve ter no mínimo 3 caracteres</Text>}
              </Box>
              <Box>
                <FormLabel>Email</FormLabel>
                <Input
                  type='email'
                  placeholder='seuemail@email.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <Text color='red'>Email inválido</Text>}
              </Box>
              <Box>
                <FormLabel>Telefone</FormLabel>
                <Input
                  type='text'
                  value={phone}
                  placeholder='Digite seu telefone'
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                />
                {phoneError && <Text color='red'>Telefone inválido</Text>}
              </Box>
              <Box>
                <FormLabel>Endereço</FormLabel>
                <Input
                  type='text'
                  value={address}
                  placeholder='Rua, número, bairro, cidade, estado'
                  onChange={(e) => setAddress(e.target.value)}
                />
                {adrressError && <Text color='red'>Endereço deve ter no mínimo 3 caracteres</Text>}
              </Box>
              <Box>
                <FormLabel>CPF</FormLabel>
                <Input
                  type='text'
                  value={cpf}
                  placeholder='000.000.000-00'
                  onChange={(e) => setCpf(formatCpf(e.target.value))}
                />
                {cpfError && <Text color='red'>CPF inválido</Text>}
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent='start'>
            <Button colorScheme='teal' mr={3} onClick={handleSave} textTransform='uppercase' disabled={buttonDisabled}>
              Salvar
            </Button>
            <Button colorScheme='red' onClick={onClose} textTransform='uppercase'>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
