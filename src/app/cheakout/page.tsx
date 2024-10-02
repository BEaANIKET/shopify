'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context';

const Page = () => {

    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, cartItems, userAddress, setUserAddress } = useAppContext()
    const [userSelectedAddress, setUserSelectedAddress] = useState({
        _id: '',
        fullName: '',
        address: '',
        city: '',
        state: '',
        pinCode: '',
        country: ''
    })
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalSavedPrice, setTotalSavedPrice] = useState(0)

    useEffect(() => {
        let totalPrice = 0;
        let totalSavedPrice = 0;
        if (cartItems.length > 0) {
            cartItems.forEach((item) => {
                totalPrice += item.productDetails.price * item.quantity;
                totalSavedPrice += (item.productDetails.price * item.quantity) * (1 - item.productDetails.priceDrop / 100);
            });
        }
        setTotalPrice(totalPrice);
        setTotalSavedPrice(totalSavedPrice);
    }, [cartItems])

    const orderDetails = useState({
        user: user?._id,
        userAddress: userSelectedAddress,
        totalPrice: totalPrice,
        totalSavedPrice: totalSavedPrice,
        orderStatus: 'Pending',
        orderDate: new Date(),
        paymentMethod: 'Online',
        deliveryAddress: userAddress,
        deliveryStatus: 'Pending',
        paymentStatus: 'Pending',
        paymentRef: '',
        trackingNumber: ''
    })




    return (
        <div>
            <h1> Helo I am cheakout page what about you</h1>
        </div>
    );
};

export default Page;
