import { Request, Response } from "express";

import UserService from "../services/user";
import { success, fail } from "../utils/response";

export async function createUser(req: Request, res: Response) {
  try {
    const userService = new UserService();
    const userCreated = await userService.saveUser(req.body);

    success(res, 200, userCreated, "User was created successfully");
  } catch (exception) {
    fail(res, 422, `User creation failed: ${exception}`);
  }
}

export async function authentication(req: Request, res: Response) {
  try {
    const userService = new UserService();
    const authenticated = await userService.authentication(
      req.body,
      process.env.SECRET || "secrets"
    );
    success(res, 200, authenticated, "User was authenticated successfully");
  } catch (exception) {
    fail(res, 422, `Authentication failed: ${exception}`);
  }
}
