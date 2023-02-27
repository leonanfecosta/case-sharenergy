import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import RandomUser from '../pages/RandomUser';
import HTTPCats from '../pages/HTTPCats';
import RandomDog from '../pages/RamdonDog';
import Users from '../pages/Users';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' />} />
      <Route path='/login' element={<Login />} />
      <Route path='/random-user' element={<RandomUser />} />
      <Route path='/http-cats' element={<HTTPCats />} />
      <Route path='/random-dog' element={<RandomDog />} />
      <Route path='/users' element={<Users />} />
    </Routes>
  );
}
