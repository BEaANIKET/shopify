import mongoose from "mongoose";

let flag = false;
export const DbConnect = async () => {
    if (flag) {
        return
    }
    try {
        const response = await mongoose.connect(process.env.MONGODB_URL)
        flag = true
    } catch (error) {
        process.exit(1);
    }
}