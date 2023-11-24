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

    const result = await User.findOneAndDelete({ userId });
    return result;
};

const updateUserFromDB = async (userId: string, data: any) => {
    const result = await User.findOneAndUpdate({ userId: userId }, { $set: data }, { new: true });
    return result;
};

const addProduct = async (userId: string, product: any) => {
    const user = await User.findOne({ userId });
    if (!user) {
        return null;
    }
    user.orders.push(product);
    const result = await user.save();
    return result;
}

const AllGetProduct=async(userId: string)=>{
    const user = await User.findOne({ userId }).select({ 'orders._id': 0 });
    if (!user) {
        return null;
    }
    return user.orders;
}

const sumOfAllProduct=async(userId: string)=>{
    const user = await User.findOne({ userId:userId }).select({_id:1});
    if (!user) {
        return null;
    }
    const productSum = await User.aggregate([
        { $match: { _id: user?._id} },
        { $unwind: "$orders" },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$orders.price" },
            },
        },
    ]);
    return productSum;
}

export const userService = {
    createUserIntoDB,
    showAllUsers,
    getSingleUserFromDB,
    deleteUserFromDB,
    updateUserFromDB,
    addProduct,
    AllGetProduct,
    sumOfAllProduct
};
