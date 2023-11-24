import express from 'express';
import { userController } from './user.controller';
const router = express.Router();
router.post("/users",userController.createUser);
router.get("/users",userController.getUsers);
router.get('/users/:userId',userController.getSingleUser);
router.delete('/users/:userId',userController.deleteUser);
router.put("/users/:userId",userController.updateUser);
export const UserRoutes = router;