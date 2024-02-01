import React, { useState } from 'react'
import styled from './Subtracting.module.scss'
import { useAppDispatch } from '../../store/hooks';
import { changeUserBalance } from '../../store/slice/usersSlice';
import { BalanceStateType } from '../../types';

export default function Subtracting(): JSX.Element {
  const [ data, setData ] = useState<BalanceStateType>({
    action: 'subtract',
    id: 0,
    sum: 0,
  });
  const dispatch = useAppDispatch();

  function handlerChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setData({...data, [e.target.name]: value });
  }

  async function submitHandler(): Promise<void> {
    const response = await fetch(`${import.meta.env.VITE_URL}/user/balance`, {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        'Content-type': 'Application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      const result = await response.json();
      console.log(result);
      dispatch(changeUserBalance(result));
    }
  }
  return (
    <div className={styled.container}>
        <span className={styled.title}>Списать с баланса пользователя</span>
        <input onChange={handlerChange} type="text" name="id" placeholder='ID' />
        <input onChange={handlerChange} type="text" name='sum' placeholder='Сумма'/>
        <button onClick={submitHandler} className={styled.mainbtn} type='button'>Списать</button>
        <div className={styled.errorcontainer}>
          <span className={styled.error}></span>
        </div>
    </div>
  )
}
