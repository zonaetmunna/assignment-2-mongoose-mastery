import { Request, Response } from 'express';
import userValidationSchema from './user.validation';
import { UserService } from './user.service';
import { responseGenerate } from '../../utils/responseGenerate';

const createUserSchema = userValidationSchema.omit({ orders: true });
// create user
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    // validation user data from body
    const parsedUserData = createUserSchema.parse(user);

    const result = await UserService.createUserAtService(parsedUserData);

    res.json(responseGenerate(true, 'User created successfully', result));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.json(responseGenerate(false, 'User creation failed', null, error));
  }
};

export const UserController = {
  createUser,
};
