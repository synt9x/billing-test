import React, { useEffect, useState } from 'react'
import './App.module.scss'
import { Route, Routes, useNavigate } from 'react-router-dom'
import MainAdmin from './pages/MainAdmin/MainAdmin'
import MainUser from './pages/MainUser/MainUser'
import { useAppDispatch, useAppSelector } from './store/hooks'
import Login from './pages/Auth/Login'
import { addUser } from './store/slice/userSlice'

function App(): JSX.Element {
  const data = useAppSelector((store) => store.userSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    void(async() => {
      const response = await fetch(`${import.meta.env.VITE_URL}/auth/sessions`, {
        credentials: 'include',
      })

      if (response.status === 200) {
        const result = await response.json();
        dispatch(addUser(result));
      }
    })();
    setTimeout(() => {
      if (data.isLoggedIn === false) {
        navigate('/login');
      } else {
        navigate('/');
      }
    }, 1500);
  },[]);
  return (
    <>
      <Routes>
        {data.user.isAdmin ? (
          <Route path='/' element={<MainAdmin />} />
        ) : (
          <Route path='/' element={<MainUser />} />
        )}
        <Route path='login' element={<Login />} />

      </Routes>
    </>
  )
}

export default App
