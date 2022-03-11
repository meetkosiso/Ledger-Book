import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { fail } from "../utils/response";

export function authenticate() {
  return (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      fail(res, 401, "No token found");
      return;
    }

    let token: string;
    token = authorization.split(" ")[1];

    if (!token) {
      fail(res, 401, "No token found");
      return;
    }

    jwt.verify(token, process.env.SECRET || "secrets", (err, decoded) => {
      if (err) {
        fail(res, 401, "Invalid token");
      } else {
        next();
      }
    });
  };
}
