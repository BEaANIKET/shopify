

import axios from 'axios'
import toast from 'react-hot-toast'


export const getAllData = async () => {

    try {

        const response = await axios.get('/api/admin/getAllData')
        return response.data

    } catch (error) {
        toast.error(
            error?.response?.data?.message || "An error occurred while getting the product"
        );
        return null
    }
}

