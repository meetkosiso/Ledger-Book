export interface IUser {
  name: string;
  userName: string;
  password: string;
}

export interface IValidation extends IUser {
  isError: boolean;
  error?: string;
}

export interface IAuthentication {
  userName: string;
  password: string;
}
