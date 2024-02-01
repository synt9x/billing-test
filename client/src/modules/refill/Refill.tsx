import React, { useState } from 'react'
import styled from './Refill.module.scss'
import { useAppDispatch } from '../../store/hooks';
import { changeUserBalance } from '../../store/slice/usersSlice';

export default function Refill(): JSX.Element {
  const [ data, setData ] = useState({
    action: 'add',
    id: 0,
    sum: 0,
  })
  const disptach = useAppDispatch();

  function handlerChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setData({...data, [e.target.name]: value });
  }

  async function submitHandler(): Promise<void> {
    const response = await fetch(`${import.meta.env.VITE_URL}/user/balance`, {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        'Content-type': 'Application/json'
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      const result = await response.json();
      disptach(changeUserBalance(result));
    }
  }
  return (
    <div className={styled.container}>
      <span className={styled.title}>Пополнить баланс пользователя</span>
      <input onChange={handlerChange} type="text" name="id" placeholder='ID' />
      <input onChange={handlerChange} type="text" name='sum' placeholder='Сумма' />
      <button onClick={submitHandler} className={styled.mainbtn} type='button'>Пополнить</button>
    </div>
  )
}
