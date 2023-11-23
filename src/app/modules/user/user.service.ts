import { TUser } from './user.interface';
import User from './user.model';

type CreateUserInput = Omit<TUser, 'orders'>;

// create user service
const createUserAtService = async (userData: CreateUserInput) => {
  const result = await User.create(userData);
  return result;
};

export const UserService = {
  createUserAtService,
};
