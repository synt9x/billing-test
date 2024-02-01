import React, { useState, useEffect } from 'react'
import styled from './Login.module.scss'
import { UTypeForm } from '../../types'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addUser } from '../../store/slice/userSlice'

export default function Login(): JSX.Element {
  const [ data, setData ] = useState<UTypeForm>({
    username: '',
    password: '',
  })
  const [ error, setError ] = useState(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.userSlice);

  useEffect(() => {
    if (user.isLoggedIn === true) {
      navigate('/');
    }
  },[user]);

  function handlerChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setData({...data, [e.target.name]: value });
  }

  async function submitData(): Promise<void> {
    const response = await fetch(`${import.meta.env.VITE_URL}/auth/login`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.status === 200) {
      const result = await response.json();
      if (result?.message) {
        setError(result.message);
      } else {
        dispatch(addUser(result));
        navigate('/');
      }
    }
  }

  return (
    <div className={styled.container}>
      <div className={styled.formcontainer}>
        <div className={styled.formtitle}>
          <span className={styled.title}>Авторизация</span>
        </div>
        <div className={styled.formmain}>
          <div className={styled.usernamecontainer}>
            <span className={styled.usernametitle}>Username</span>
            <input onChange={handlerChange} className={styled.usernameinp} type="text" name="username" placeholder='^_^'/>
          </div>
          <div className={styled.passwordcontainer}>
            <span className={styled.passwordtitle}>Password</span>
            <input onChange={handlerChange} className={styled.passwordinp} type="password" name="password" placeholder='^_^'/>
          </div>
        </div>
        <div className={styled.loginbtncontainer}>
          <input onClick={submitData} className={styled.loginbtn} type="button" name="button" value={'Войти'} />
        </div>
        <div className={styled.errorcontainer}>
          <span className={styled.err}>{error}</span>
        </div>
      </div>
    </div>
  )
}
