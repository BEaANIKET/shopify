
'use client'
import axios from 'axios'
import toast from 'react-hot-toast'

export const addToCart = async (productId, userId) => {
    try {
        const response = await axios.post('/api/client/cart/addToCart', { productId, userId })
        return response.data

    } catch (error) {
        toast.error(error.message)
        return null
    }
}

export const getCartItems = async (userId) => {
    let count = 3
    let flag = false;
    while (count) {
        try {
            const response = await axios.get(`/api/client/cart/getCartItems?userId=${userId}`)
            return response.data
        } catch (error) {

        }
        count--;
    }
    toast.error("Failed to fetch cart items. Network error.")

}

export const updateCartItemQuantity = async (productId, userId, quantity) => {
    try {
        const response = await axios.post('/api/client/cart/updateCart', {
            productId, userId, quantity
        })
        return response.data;
    } catch (error) {
        toast.error(error.message);
        return null
    }
}

export const removeCartItem = async (productId, userId) => {
    try {
        const response = await axios.post('/api/client/cart/removeCartItem', {
            productId, userId
        })
        toast.success("Product has been removed")
        return response.data;
    } catch (error) {
        toast.error(error.message);
        return null
    }
}

export const removeAllCartItems = async () => {
    try {
        const response = await axios.post('/api/client/cart/removeAllCartItems')
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "try again later");
    }
}