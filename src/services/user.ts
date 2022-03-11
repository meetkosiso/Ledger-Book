import UserRepository from "../repositories/user";

import { IUser, IAuthentication } from "../interface/user";
import Password from "../utils/password";
import { UserEntity } from "../entity/user";

class UserService {
  repository: UserRepository;
  password: Password;

  constructor() {
    this.repository = new UserRepository();
    this.password = new Password();
  }

  async saveUser(userRequest: IUser) {
    const userEntity = UserEntity(userRequest);

    if (userEntity.isError === true) {
      throw userEntity.error;
    }
    const { name, userName, password } = userEntity;

    const userFound = await this.repository.findUser(userName);

    if (userFound) {
      throw "User already exist";
    }

    const hashedPassword = this.password.hash(password);

    const response = await this.repository.saveUser({
      ...userEntity,
      password: hashedPassword,
    });

    return response;
  }

  async authentication(loginRequest: IAuthentication, secrets: string) {
    const { userName, password } = loginRequest;

    const userFound = await this.repository.findUser(userName);

    if (!userFound) {
      throw "User not found";
    }

    const passwordMatched = this.password.compare(password, userFound.password);

    if (!passwordMatched) {
      throw "Incorrect password";
    }

    return this.password.getToken({}, secrets);
  }
}

export default UserService;
