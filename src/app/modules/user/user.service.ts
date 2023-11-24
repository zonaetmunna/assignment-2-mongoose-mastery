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

const getUserById = async (userId: number) => {
  const result = await User.aggregate([
    {
      $match: {
        userId,
      },
    },
    {
      $project: {
        password: 0,
        orders: 0,
      },
    },
  ]);
  return result;
};

const updateUserService = async (userId: number, userData: TUser) => {
  const result = await User.findOneAndUpdate({ userId }, userData, {
    new: true,
  }).select('-password -orders');
  return result;
};

const deleteUserService = async (userId: number) => {
  const result = await User.deleteOne({ userId });
  return result;
};

const updateUserProductsService = async (
  userId: number,
  order: TUser['orders'],
) => {
  const result = await User.findOneAndUpdate(
    { userId },
    { orders: order },
    {
      new: true,
    },
  );
  return result;
};

// get orders for specific user
const getUserOrdersService = async (userId: number) => {
  const result = await User.aggregate([
    {
      $match: {
        userId,
      },
    },
    {
      $unwind: '$orders',
    },
    {
      $project: {
        productName: '$orders.productName',
        quantity: '$orders.quantity',
        price: '$orders.price',
      },
    },
  ]);
  return result;
};

// get total order price for specific user
const getTotalOrderPriceService = async (userId: number) => {
  const result = await User.aggregate([
    { $match: { userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        totalPrice: { $sum: '$orders.price' },
      },
    },
  ]);

  if (result.length === 0) {
    return null;
  }
  return result[0].totalPrice;
};

export const UserService = {
  createUserAtService,
  getAllUsers,
  getUserById,
  updateUserService,
  deleteUserService,
  updateUserProductsService,
  getUserOrdersService,
  getTotalOrderPriceService,
};
