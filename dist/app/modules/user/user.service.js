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
exports.UserService = void 0;
const user_model_1 = __importDefault(require("./user.model"));
// create user service
const createUserAtService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.create(userData);
    return result;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.find();
    return result;
});
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.aggregate([
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
});
const updateUserService = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findOneAndUpdate({ userId }, userData, {
        new: true,
    }).select('-password -orders');
    return result;
});
const deleteUserService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.deleteOne({ userId });
    return result;
});
const updateUserProductsService = (userId, order) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findOneAndUpdate({ userId }, { orders: order }, {
        new: true,
    });
    return result;
});
// get orders for specific user
const getUserOrdersService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.aggregate([
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
});
// get total order price for specific user
const getTotalOrderPriceService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.aggregate([
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
});
exports.UserService = {
    createUserAtService,
    getAllUsers,
    getUserById,
    updateUserService,
    deleteUserService,
    updateUserProductsService,
    getUserOrdersService,
    getTotalOrderPriceService,
};
