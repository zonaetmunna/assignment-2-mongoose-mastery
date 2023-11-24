"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config/config"));
const fullNameSchema = new mongoose_1.Schema({
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
}, {
    _id: false,
    timestamps: false,
    versionKey: false,
});
const addressSchema = new mongoose_1.Schema({
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
}, {
    _id: false,
    timestamps: false,
    versionKey: false,
});
const orderSchema = new mongoose_1.Schema({
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
}, {
    _id: false,
    timestamps: false,
    versionKey: false,
});
const userSchema = new mongoose_1.Schema({
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
}, {
    versionKey: false,
    timestamps: false,
});
// hash password before saving
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
//  ignore password and orders failed to save
userSchema.post('save', function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        doc.password = undefined;
        doc.orders = undefined;
        next();
    });
});
// mongoose
userSchema.pre('find', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.select('username fullName age email address _id');
        next();
    });
});
// static method for existUser
userSchema.statics.isUserExists = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existUser = yield this.findOne({ userId });
        return !!existUser;
    });
};
// mongoose middleware method for findOne
/* // for find single user mongoose middle method
userSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { userId: { $exists: true } } });
  next();
});
userSchema.post('aggregate', async function (user, next) {
  user.forEach(user => {
    user.password = '';
  });
  next();
}); */
// mongoose middleware method for update
userSchema.post('findOneAndUpdate', function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        doc.password = undefined;
        next();
    });
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
