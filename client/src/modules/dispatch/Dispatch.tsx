import React, { useState } from 'react'
import styled from './Dispatch.module.scss'
import { DisStateType } from '../../types';
import { useAppDispatch } from '../../store/hooks';
import { changeUserBalance } from '../../store/slice/usersSlice';

export default function Dispatch(): JSX.Element {
  const [ data, setData ] = useState<DisStateType>({
    sender: 0,
    recipient: 0,
    sum: 0,
  })
  const [ err, setErr ] = useState(null);
  const dispatch = useAppDispatch();

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setData({...data, [e.target.name]: value })
  }

  async function submitHandler(): Promise<void> {
    const response = await fetch(`${import.meta.env.VITE_URL}/user/dispatch`, {
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
      if (result?.message) {
        setErr(result.message);
      } else {
        dispatch(changeUserBalance(result.newDataSender));
        dispatch(changeUserBalance(result.newDataRecipient));
      }
    }
  }
  return (
    <div className={styled.container}>
      <div className={styled.containerinp}>
        <span className={styled.distitle}>ID отправителя</span>
        <input onChange={changeHandler} className={styled.typeinp} type="text" name="sender" placeholder='id' />
      </div>
      <div className={styled.containerinp}>
        <span className={styled.distitle}>ID получателя</span>
        <input onChange={changeHandler} className={styled.typeinp} type="text" name="recipient" placeholder='id' />
      </div>
      <div className={styled.containerinp}>
        <span className={styled.distitle}>Сумма</span>
        <input onChange={changeHandler} className={styled.typeinp} type="text" name="sum" placeholder='Сумма' />
      </div>
      <button onClick={submitHandler} className={styled.mainbtn}>Отправить</button>
      <div className={styled.errcontainer}>
        <span className={styled.err}>{err}</span>
      </div>
    </div>
  )
}
