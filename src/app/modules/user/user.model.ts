import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TOrders, TUser } from './user.interface';

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
  },
});

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const orderSchema = new Schema<TOrders>({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const userSchema = new Schema<TUser>(
  {
    userId: {
      type: Number,
      required: [true, 'User Id is required'],
      unique: true,
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
      maxlength: [20, 'Password should not be more than 20 characters'],
      minlength: [6, 'Password should not be less than 6 characters'],
    },
    fullName: fullNameSchema,
    age: {
      type: Number,
      required: [true, 'Age is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      required: [true, 'Active status is required'],
      default: true,
    },
    hobbies: {
      type: [String],
      required: [true, 'Hobbies are required'],
      default: [],
      trim: true,
      lowercase: true,
    },
    address: addressSchema,
    orders: orderSchema,
  },
  {
    timestamps: true,
  },
);

const User = model<TUser>('User', userSchema);
export default User;
