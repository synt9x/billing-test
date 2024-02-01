import React, { useState, useEffect } from 'react'
import styled from './MainUser.module.scss'
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

export default function MainUser(): JSX.Element {
  const [ balance, setBalance ] = useState(null);
  const [ isHidden, setIsHidden ] = useState(true);
  const data = useAppSelector((store) => store.userSlice.user);

  async function balanceHanlder(): Promise<void> {
    const response = await fetch(`${import.meta.env.VITE_URL}/user/${data.id}`, {
      credentials: 'include',
    });

    if (response.status === 200) {
      const result = await response.json();
      console.log(result.balance);
      setBalance(result.balance);
      setIsHidden(false);
    }
  }

  return (
    <div className={styled.container}>
      <div className={styled.contentcontainer}>
        <span className={styled.naminguser}>Пользователь: {data.username}</span>
        <button onClick={balanceHanlder} className={styled.btnbalance}>Показать баланс</button>
        <div className={`${styled.balancecontainer} ${isHidden ? styled.hidden : ''}`}>
          <span className={styled.balance}>Ваш баланс: {balance}</span>
        </div>
      </div>
    </div>
  )
}
