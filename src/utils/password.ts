import { genSaltSync, hashSync, compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";

class Password {
  hash(password: string) {
    return hashSync(password, genSaltSync(8));
  }

  compare(savedPassword: string, password: string) {
    return compareSync(savedPassword, password);
  }

  getToken(payload: Record<string, string>, secrets: string) {
    return sign(payload, secrets);
  }
}

export default Password;
