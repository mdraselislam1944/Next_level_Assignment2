import express from 'express';
import { userController } from './user.controller';
const router = express.Router();
router.post("/users",userController.createUser);
router.get("/users",userController.getUsers);
router.get('/users/:userId',userController.getSingleUser);
router.delete('/users/:userId',userController.deleteUser);
router.put("/users/:userId",userController.updateUser);
router.put("/users/:userId/orders",userController.AddProductUser);
router.get("/users/:userId/orders",userController.getAllProduct);
router.get("/users/:userId/orders/total-price",userController.TotalPrice);

export const UserRoutes = router;