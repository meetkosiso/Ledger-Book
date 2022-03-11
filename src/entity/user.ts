import { IUser, IValidation } from "../interface/user";

export function UserEntity(user: IUser): IValidation {
  const { name, userName, password } = user;

  if (!name) {
    return { isError: true, ...user, error: "Name field is missing" };
  }

  if (!userName) {
    return { isError: true, ...user, error: "UserName field is missing" };
  }

  if (!password) {
    return { isError: true, ...user, error: "Password field is missing" };
  }

  return { isError: false, ...user };
}
