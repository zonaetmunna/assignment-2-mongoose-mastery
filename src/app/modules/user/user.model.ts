import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { TAddress, TFullName, TOrders, TUser } from './user.interface';
import config from '../../config/config';

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
    hobbies: [
      {
        type: String,
        required: [true, 'Hobbies are required'],
        default: [],
        trim: true,
        lowercase: true,
      },
    ],
    address: addressSchema,
    orders: [orderSchema],
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

userSchema.pre('find', async function (next) {
  this.select('username fullName age email address');
  next();
});

// userSchema.pre('findOne', async function (next) {});

const User = model('User', userSchema);
export default User;
