import React, { useState, useEffect } from 'react'
import styled from './Cell.module.scss'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addUsers } from '../../store/slice/usersSlice';
import { UsersTypes } from '../../types';

export default function Cell(): JSX.Element {
  const [ data, setData ] = useState<UsersTypes>([]);
  const dispatch = useAppDispatch();
  const store = useAppSelector((store) => store.usersSlice);

  useEffect(() => {
    setData(store.users)
  }, [store.users]);

  useEffect(() => {
    void(async() => {
      const response = await fetch(`${import.meta.env.VITE_URL}/user/`, {
        credentials: 'include',
      });

      if (response.status === 200) {
        const result = await response.json();
        dispatch(addUsers(result));
        setData(result);
      }
    })();
  },[]);

  return (
    <div className={styled.cellcontainer}>
      {data?.map((el) => (
        <div className={styled.tablecont} key={el.id}>
          <span className={styled.anyinfous}>{el.id}</span>
          <span className={styled.anyinfous}>{el.username}</span>
          <span className={styled.anyinfous}>{el.balance} Руб</span>
        </div>
      ))}
    </div>
  )
}
