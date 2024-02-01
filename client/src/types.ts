export type UserType = {
  id: number;
  username: string;
  balance: number;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ITypeState = {
  user : UserType;
  isLoggedIn: boolean;
}

export type UTypeForm = {
  username: string;
  password: string;
}

export type ITypeStateUsers = {
  users: UsersTypes;
}

export type UsersTypes = [UsersType]

export type UsersType = {
  id: number;
  username: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;

}

export type BalanceStateType =  {
  action: string;
  id: number;
  sum: number;
}

export type DisStateType = {
  sender: number;
  recipient: number;
  sum: number;
}

export type ResultType = {
  sender: number;
  recipient: number;
  sum: number;
}