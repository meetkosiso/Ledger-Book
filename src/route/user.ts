import express from "express";
import * as userController from "../controller/user";

const router = express.Router();

router.post("/user/create", userController.createUser);

router.post("/user/authenticate", userController.authentication);

export default router;
