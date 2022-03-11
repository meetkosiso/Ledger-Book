import DatabaseFactory from "../providers/database";
import { IUser } from "../interface/user";
import UserModel from "../models/user";

class UserRepository {
  dbProvider: any;

  constructor() {
    this.dbProvider = DatabaseFactory.getDatabaseProvider(UserModel);
  }

  saveUser(user: IUser) {
    return this.dbProvider.add(user);
  }

  findUser(userName: string) {
    return this.dbProvider.find({ userName });
  }
}

export default UserRepository;
