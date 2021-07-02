import { Router } from "express";
import { getRepository } from "typeorm";
import { User } from "../database/entities/user";
import { authMiddleware } from "../middlewares/auth.middleware";

export const userRouter = Router();

userRouter.get("/users", authMiddleware, async (req, res) => {
  const repository = getRepository(User);

  const users = await repository.query("select * from users");

  return res.send(JSON.stringify(users));
});

userRouter.post("/users", async (req, res) => {
  const userRepository = getRepository(User);
  const { email, password } = req.body;

  const userExists = await userRepository.findOne({ where: { email } });

  if (userExists) {
    return res.sendStatus(409);
  }

  const user = userRepository.create({ email, password });
  await userRepository.save(user);

  const response = { email: user.email, id: user.id };

  return res.json(response);
});
