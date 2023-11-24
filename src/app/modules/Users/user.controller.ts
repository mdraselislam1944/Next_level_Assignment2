import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const result = await userService.createUserIntoDB(user);
        res.status(201).json({ status: true, message: "user is created", data: result })
    } catch (error: any) {
        res.status(500).json({ status: false, message: "user is not created", data: error.message })
    }
}
const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.showAllUsers();

        res.status(200).json({
            success: true,
            message: 'Students are retrieved succesfully',
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
};


const getSingleUser= async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await userService.getSingleUserFromDB(userId);

        res.status(200).json({
            success: true,
            message: 'Student is retrieved succesfully',
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
};

const deleteUser= async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const result = await userService.deleteUserFromDB(userId);

        res.status(200).json({
            success: true,
            message: 'Student is deleted succesfully',
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
};

const updateUser= async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const data=req.body
       const result = await userService.updateUserFromDB(userId,data);
        res.status(200).json({
            success: true,
            message: 'user is updated succesfully',
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
};



export const userController = {
    createUser, getUsers,getSingleUser,deleteUser,updateUser
};