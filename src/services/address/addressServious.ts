
import toast from 'react-hot-toast'
import axios from 'axios'

export const addNewAddress = async ({ fullName, address, pinCode, state, city, country }) => {
    try {
        const response = await axios.post('/api/address/add-address', {
            fullName, address, pinCode, state, city, country
        });
        return response.data;
    } catch (error) {
        toast.error(
            error?.response?.data?.message || "An error occurred while adding new address"
        );
        return null;
    }
}

export const deleteAddress = async (addressId) => {
    try {
        const response = await axios.delete(`/api/address/delete-address?addressId=${addressId}`);
        return response.data;
    } catch (error) {
        toast.error(
            error?.response?.data?.message || "An error occurred while deleting address"
        );
        return null;
    }
}

export const updateAddress = async ({ fullName, address, pinCode, state, city, country }, addressId) => {
    try {
        const response = await axios.post(`/api/address/update-address?addressId=${addressId}`, {
            fullName, address, pinCode, state, city, country
        });
        return response.data;
    } catch (error) {
        toast.error(
            error?.response?.data?.message || "An error occurred while updating address"
        );
        return null;
    }
}

export const getAddress = async () => {
    try {
        const response = await axios.get('/api/address/get-address');
        return response.data;
    } catch (error) {
        toast.error(
            error?.response?.data?.message || "An error occurred while getting address"
        );
        return null;
    }
}