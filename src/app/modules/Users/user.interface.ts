// import {Model} from "mongoose";


export type tUserInformation={
    userId: number;
    username: string;
    password: string;
    fullName: {
      firstName: string;
      lastName: string;
    };
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: {
      street: string;
      city: string;
      country: string;
    };
    orders: {
      productName: string;
      price: number;
      quantity: number;
    }[];   
}

// export interface UserModel extends Model<tUserInformation>{
//     isUserExists(id: string): Promise<tUserInformation | null>;
//   }