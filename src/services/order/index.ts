import axios from "axios"

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