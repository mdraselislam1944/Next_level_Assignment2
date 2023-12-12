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
exports.userController = void 0;
const user_service_1 = require("./user.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const user_validation_1 = __importDefault(require("./user.validation"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        // Ensure that the "orders" field is present, or set it to an empty array
        const user = user_validation_1.default.parse(Object.assign(Object.assign({}, data), { orders: data.orders || [] }));
        const saltRounds = parseInt(config_1.default.bcrypt_salt_rounds || '10', 10);
        if (isNaN(saltRounds)) {
            throw new Error('Invalid salt rounds configuration');
        }
        bcrypt_1.default.hash(user.password, saltRounds, function (err, hash) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    throw err;
                }
                const result = yield user_service_1.userService.createUserIntoDB(Object.assign(Object.assign({}, user), { password: hash }));
                res.status(201).json({ status: true, message: "User is created", data: result });
            });
        });
    }
    catch (error) {
        res.status(500).json({ status: false, message: "User is not created", data: error.message });
    }
});
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userService.showAllUsers();
        if (!result) {
            res.status(200).json({
                success: true,
                message: 'users can not found',
                data: result,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Students are retrieved succesfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userService.getSingleUserFromDB(userId);
        if (!result) {
            res.status(200).json({
                success: true,
                message: 'user can not found',
                data: result,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Student is retrieved succesfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userService.deleteUserFromDB(userId);
        if (!result) {
            res.status(200).json({
                success: true,
                message: 'user can not found',
                data: result,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Student is deleted succesfully',
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const data = req.body;
        const result = yield user_service_1.userService.updateUserFromDB(userId, data);
        if (!result) {
            res.status(200).json({
                success: true,
                message: 'user can not found',
                data: result,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'user is updated succesfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
const AddProductUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const product = req.body;
    try {
        // Check if req.body is empty
        if (!product) {
            res.status(400).json({
                success: false,
                message: 'Request body is empty',
                error: null,
            });
            return;
        }
        const result = yield user_service_1.userService.addProduct(userId, product);
        if (!result) {
            res.status(404).json({
                success: false,
                message: 'User not found',
                data: null,
            });
            return;
        }
        // Move the console.log here or remove it
        console.log("hello world");
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userService.AllGetProduct(userId);
        if (!result) {
            res.status(200).json({
                success: true,
                message: 'user can not found',
                data: result,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: { orders: result },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
const TotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userService.sumOfAllProduct(userId);
        if (!result) {
            res.status(200).json({
                success: true,
                message: 'user can not found',
                data: result,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Total price calculated successfully!",
            data: { totalPrice: result },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
exports.userController = {
    createUser, getUsers, getSingleUser, deleteUser, updateUser, AddProductUser, getAllProduct, TotalPrice
};
