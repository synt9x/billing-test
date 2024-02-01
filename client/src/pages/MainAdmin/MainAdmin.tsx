import React, { useEffect } from 'react'
import styled from './MainAdmin.module.scss'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks';
import Cell from '../../components/tablecell/Cell';
import Refill from '../../modules/refill/Refill';
import Subtracting from '../../modules/subtracting/Subtracting';
import Dispatch from '../../modules/dispatch/Dispatch';

export default function MainAdmin(): JSX.Element {
  const data = useAppSelector((store) => store.userSlice);

  return (
    <div className={styled.container}>
      <main className={styled.maincontainer}>
        <div className={styled.tablecontainer}>
          <div className={styled.tableheader}>
            <span className={styled.tableheadertitle}>ID Пользователя</span>
            <span className={styled.tableheadertitle}>Username</span>
            <span className={styled.tableheadertitle}>Баланс пользователя</span>
          </div>
          <div className={styled.tablecontent}>
            <Cell />
          </div>
        </div>
        <div className={styled.modulescontainer}>
          <Refill />
          <Subtracting />
          <Dispatch />
        </div>
      </main>
    </div>
  )
}
