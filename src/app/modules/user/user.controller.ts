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

    res.json(
      responseGenerate(true, 'User created successfully!', result, null),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.json(
      responseGenerate(false, 'User creation failed', null, error.message),
    );
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.json(responseGenerate(true, 'Users fetched successfully', users));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.json(
      responseGenerate(false, 'Users fetch failed', null, error.message),
    );
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log(
      '🚀 ~ file: user.controller.ts:40 ~ getUserById ~ userId:',
      userId,
    );

    const user = await UserService.getUserById(Number(userId));
    console.log('🚀 ~ file: user.controller.ts:46 ~ getUserById ~ user:', user);

    if (!user) {
      return res.json(responseGenerate(false, 'User not found', null));
    }
    res.json(responseGenerate(true, 'User fetched successfully', user));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.json(responseGenerate(false, 'User fetch failed', null, error.message));
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log(
      '🚀 ~ file: user.controller.ts:61 ~ updateUser ~ userId:',
      userId,
    );

    const userData = req.body;
    console.log(
      '🚀 ~ file: user.controller.ts:64 ~ updateUser ~ userData:',
      userData,
    );
    // const zodParsedUser = userValidationSchema.parse(userData);

    const result = await UserService.updateUserService(
      Number(userId),
      userData,
    );
    console.log(
      '🚀 ~ file: user.controller.ts:77 ~ updateUser ~ result:',
      result,
    );
    if (!result) {
      return res.json(responseGenerate(false, 'User not found', null));
    }
    res.json(responseGenerate(true, 'User updated successfully', result));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.json(
      responseGenerate(false, 'User update failed', null, error.message),
    );
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.deleteUserService(Number(userId));
    res.json(responseGenerate(true, 'User deleted successfully', result));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.json(
      responseGenerate(false, 'User deletion failed', null, error.message),
    );
  }
};

const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.getUserOrdersService(Number(userId));
    if (!result) {
      return res.json(responseGenerate(false, 'User not found', null));
    }
    res.json(
      responseGenerate(true, 'User orders fetched successfully', result),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.json(
      responseGenerate(false, 'User orders fetch failed', null, error.message),
    );
  }
};

const getTotalOrderPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const totalPrice = await UserService.getTotalOrderPriceService(
      Number(userId),
    );
    if (totalPrice === null) {
      return res.json(
        responseGenerate(false, 'User not found', null, {
          code: 404,
          description: 'User not found!',
        }),
      );
    }
    res.json(
      responseGenerate(
        true,
        'Total price calculated successfully!',
        {
          totalPrice: totalPrice,
        },
        null,
      ),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.json(
      responseGenerate(false, 'User orders fetch failed', null, error.message),
    );
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserOrders,
  getTotalOrderPrice,
};
