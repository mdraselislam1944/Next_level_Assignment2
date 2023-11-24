"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post("/users", user_controller_1.userController.createUser);
router.get("/users", user_controller_1.userController.getUsers);
router.get('/users/:userId', user_controller_1.userController.getSingleUser);
router.delete('/users/:userId', user_controller_1.userController.deleteUser);
router.put("/users/:userId", user_controller_1.userController.updateUser);
router.put("/users/:userId/orders", user_controller_1.userController.AddProductUser);
router.get("/users/:userId/orders", user_controller_1.userController.getAllProduct);
router.get("/users/:userId/orders/total-price", user_controller_1.userController.TotalPrice);
exports.UserRoutes = router;
