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
exports.UserController = void 0;
const user_validation_1 = __importDefault(require("./user.validation"));
const user_service_1 = require("./user.service");
const responseGenerate_1 = require("../../utils/responseGenerate");
const user_model_1 = __importDefault(require("./user.model"));
// omit orders from user
const createUserSchema = user_validation_1.default.omit({ orders: true });
// create user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        // validation user data from body
        const parsedUserData = createUserSchema.parse(user);
        const result = yield user_service_1.UserService.createUserAtService(parsedUserData);
        res.json((0, responseGenerate_1.responseGenerate)(true, 'User created successfully!', result, null));
    }
    catch (error) {
        res.json((0, responseGenerate_1.responseGenerate)(false, 'User creation failed', null, error.message));
    }
});
// get all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserService.getAllUsers();
        res.json((0, responseGenerate_1.responseGenerate)(true, 'Users fetched successfully !', result));
    }
    catch (error) {
        res.json((0, responseGenerate_1.responseGenerate)(false, 'Users fetch failed', null, error.message));
    }
});
// get user by id
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const isUserExists = yield user_model_1.default.isUserExists(userId);
        if (!isUserExists) {
            return res.json((0, responseGenerate_1.responseGenerate)(false, 'User not found', null, {
                code: 404,
                description: 'User not found!',
            }));
        }
        const user = yield user_service_1.UserService.getUserById(Number(userId));
        res.json((0, responseGenerate_1.responseGenerate)(true, 'User fetched successfully', user));
    }
    catch (error) {
        res.json((0, responseGenerate_1.responseGenerate)(false, 'User fetch failed', null, error.message));
    }
});
// update user information
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const userData = req.body;
        const isUserExists = yield user_model_1.default.isUserExists(userId);
        if (!isUserExists) {
            return res.json((0, responseGenerate_1.responseGenerate)(false, 'User not found', null, {
                code: 404,
                description: 'User not found!',
            }));
        }
        const result = yield user_service_1.UserService.updateUserService(Number(userId), userData);
        res.json((0, responseGenerate_1.responseGenerate)(true, 'User updated successfully', result, null));
    }
    catch (error) {
        res.json((0, responseGenerate_1.responseGenerate)(false, 'User update failed', null, error.message));
    }
});
// delete user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const isUserExists = yield user_model_1.default.isUserExists(userId);
        if (!isUserExists) {
            return res.json((0, responseGenerate_1.responseGenerate)(false, 'User not found', null, {
                code: 404,
                description: 'User not found!',
            }));
        }
        yield user_service_1.UserService.deleteUserService(Number(userId));
        res.json((0, responseGenerate_1.responseGenerate)(true, 'User deleted successfully', 'null', null));
    }
    catch (error) {
        res.json((0, responseGenerate_1.responseGenerate)(false, 'User deletion failed', null, error.message));
    }
});
// update user products
const updateUserProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const order = req.body;
        const isUserExists = yield user_model_1.default.isUserExists(userId);
        if (!isUserExists) {
            return res.json((0, responseGenerate_1.responseGenerate)(false, 'User not found', null, {
                code: 404,
                description: 'User not found!',
            }));
        }
        yield user_service_1.UserService.updateUserProductsService(Number(userId), order);
        res.json((0, responseGenerate_1.responseGenerate)(true, 'User products updated successfully', 'null', null));
    }
    catch (error) {
        res.json((0, responseGenerate_1.responseGenerate)(false, 'User products update failed', null, error.message));
    }
});
// get user orders
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const isUserExists = yield user_model_1.default.isUserExists(userId);
        if (!isUserExists) {
            return res.json((0, responseGenerate_1.responseGenerate)(false, 'User not found', null, {
                code: 404,
                description: 'User not found!',
            }));
        }
        const result = yield user_service_1.UserService.getUserOrdersService(Number(userId));
        if (!result) {
            return res.json((0, responseGenerate_1.responseGenerate)(false, 'User not found', null));
        }
        res.json((0, responseGenerate_1.responseGenerate)(true, 'User orders fetched successfully', {
            orders: result,
        }));
    }
    catch (error) {
        res.json((0, responseGenerate_1.responseGenerate)(false, 'User orders fetch failed', null, error.message));
    }
});
// get total order price for specific user
const getTotalOrderPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const isUserExists = yield user_model_1.default.isUserExists(userId);
        if (!isUserExists) {
            return res.json((0, responseGenerate_1.responseGenerate)(false, 'User not found', null, {
                code: 404,
                description: 'User not found!',
            }));
        }
        const totalPrice = yield user_service_1.UserService.getTotalOrderPriceService(Number(userId));
        res.json((0, responseGenerate_1.responseGenerate)(true, 'Total price calculated successfully!', {
            totalPrice: totalPrice,
        }, null));
    }
    catch (error) {
        res.json((0, responseGenerate_1.responseGenerate)(false, 'User orders fetch failed', null, error.message));
    }
});
exports.UserController = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    updateUserProducts,
    getUserOrders,
    getTotalOrderPrice,
};
