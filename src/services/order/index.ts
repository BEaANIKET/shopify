import axios from "axios"
import { error } from "console";
import toast from "react-hot-toast";

export const createOrder = async (data) => {
    try {
        const response = await axios.post('/api/order/createorder', { data })
    } catch (error) {
        return null;
    }
}


export const getOrder = async () => {
    try {
        const response = await axios.get('/api/order/getorder');
        return response.data;
    } catch (error) {
        return null;
    }
}

export const getAdminOrder = async () => {
    try {
        const response = await axios.get('/api/admin/getorder');
        return response.data;
    } catch (error) {
        return null;
    }
}