import { TUser } from './user.interface';
import User from './user.model';

type CreateUserInput = Omit<TUser, 'orders'>;

// create user service
const createUserAtService = async (userData: CreateUserInput) => {
  const result = await User.create(userData);
  return result;
};

const getAllUsers = async () => {
  const result = await User.find();
  return result;
};

export const UserService = {
  createUserAtService,
  getAllUsers,
};
