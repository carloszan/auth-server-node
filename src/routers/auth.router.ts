import { Router } from "express";
import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../database/entities/user";

export const authRouter = Router();

authRouter.post("/auth", async (req, res) => {
  const userRepository = getRepository(User);
  const { email, password } = req.body;

  const user = await userRepository.findOne({ where: { email } });

  if (!user) {
    return res.sendStatus(401);
  }

  const isValidPassword = await compare(password, user.password);

  if (!isValidPassword) {
    return res.sendStatus(401);
  }

  const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1d" });

  const userResponse = {
    id: user.id,
    email: user.email,
  };

  return res.json({
    userResponse,
    token,
  });
});
