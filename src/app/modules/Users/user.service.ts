import { tUserInformation } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (user: tUserInformation) => {
    const result = await User.create(user);
    return result;
}

const showAllUsers = async () => {
    const result = await User.find().select({ username: 1, fullName: 1, age: 1, email: 1, address: 1 });
    return result;
}
const getSingleUserFromDB = async (userId: string) => {
    const result = await User.findOne({ userId: userId });
    return result;
};

const deleteUserFromDB = async (userId: string) => {

    const result = await User.findOneAndDelete({ userId});
    return result;
};

const updateUserFromDB = async (userId: string, data: any) => {
    const result = await User.findOneAndUpdate({userId:userId}, { $set: data }, { new: true });
    return result;
};


export const userService = {
    createUserIntoDB,
    showAllUsers,
    getSingleUserFromDB,
    deleteUserFromDB,
    updateUserFromDB
};
