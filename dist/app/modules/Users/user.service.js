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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(user);
    return result;
});
const showAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find().select({ username: 1, fullName: 1, age: 1, email: 1, address: 1 });
    return result;
});
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ userId: userId });
    return result;
});
const deleteUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndDelete({ userId });
    return result;
});
const updateUserFromDB = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate({ userId: userId }, { $set: data }, { new: true });
    return result;
});
const addProduct = (userId, product) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ userId });
    if (!user) {
        return null;
    }
    user.orders.push(product);
    const result = yield user.save();
    return result;
});
const AllGetProduct = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ userId }).select({ 'orders._id': 0 });
    if (!user) {
        return null;
    }
    return user.orders;
});
const sumOfAllProduct = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ userId: userId }).select({ _id: 1 });
    if (!user) {
        return null;
    }
    const productSum = yield user_model_1.User.aggregate([
        { $match: { _id: user === null || user === void 0 ? void 0 : user._id } },
        { $unwind: "$orders" },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$orders.price" },
            },
        },
    ]);
    return productSum;
});
exports.userService = {
    createUserIntoDB,
    showAllUsers,
    getSingleUserFromDB,
    deleteUserFromDB,
    updateUserFromDB,
    addProduct,
    AllGetProduct,
    sumOfAllProduct
};
