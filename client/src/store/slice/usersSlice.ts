import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITypeStateUsers, UsersType, UsersTypes } from '../../types';

const initialState: ITypeStateUsers = {
  users: [
    {
      id: 0,
      username: '',
      balance: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]
}

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUsers: (state, action: PayloadAction<UsersTypes>) => {
      state.users = action.payload;
    },
    delUsers: (state, action: PayloadAction<UsersTypes>) => {
      state.users = action.payload;
    },
    changeUserBalance: (state, action: PayloadAction<UsersType>) => {
      state.users.forEach((el) => {
        if (el.id === action.payload.id) {
          el.balance = action.payload.balance;
        }
      })
    },
  },
});

export const { addUsers, delUsers, changeUserBalance  } = usersSlice.actions;
