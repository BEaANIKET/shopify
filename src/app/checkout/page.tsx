'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context';
import { Button } from "@/components/ui/button";

const Page = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, cartItems, userAddress, setUserAddress, userSelectedAddress, setUserSelectedAddress } = useAppContext();
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalSavedPrice, setTotalSavedPrice] = useState(0);

    useEffect(() => {
        let calculatedTotalPrice = 0;
        let calculatedTotalSavedPrice = 0;

        if (cartItems.length > 0) {
            cartItems.forEach(item => {
                calculatedTotalPrice += item.productDetails.price * item.quantity;
                calculatedTotalSavedPrice += (item.productDetails.price * item.quantity) * (1 - item.productDetails.priceDrop / 100);
            });
        }
        setTotalPrice(calculatedTotalPrice);
        setTotalSavedPrice(calculatedTotalSavedPrice);
    }, [cartItems]);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-GB');  // You can change the locale to fit your format
    };


    const [orderDetails, setOrderDetails] = useState({
        user: user?.id || '',
        deliveryAddress: userSelectedAddress || null,
        totalPrice: totalPrice,
        totalSavedPrice: totalSavedPrice,
        orderStatus: 'Pending',
        orderDate: formatDate(new Date()),
        paymentMethod: 'Online',
        deliveryStatus: 'Pending',
        paymentStatus: 'Pending',
        paymentRef: '',
        trackingNumber: ''
    });

    const handlePlaceOrder = async () => {
        if (!orderDetails.user || !userSelectedAddress) {
            alert('Please fill all required fields');
            return;
        }

        try {
            // Simulate order placing logic (API call, etc.)
            console.log('Order placed:', orderDetails);
            // router.push('/checkout');
        } catch (err) {
            setError('Failed to place order. Please try again.');
        }
    };

    return (
        <div className="flex flex-col lg:max-w-6xl mx-auto gap-6 p-4">
            {/* Cart Items Section */}
            <div className="flex flex-col flex-1">
                <h4 className="text-lg font-semibold mb-4 text-gray-700">Selected Items:</h4>
                {cartItems && cartItems.length > 0 ? (
                    cartItems.map(item => (
                        <div key={item._id} className="flex items-center border-b border-gray-200 pb-4 mb-4">
                            <div className="h-[70px] w-[70px]">
                                <img src={item.productDetails.imageUrl} alt={item.productDetails.name} className="h-full w-full object-contain" />
                            </div>
                            <div className="flex flex-col pl-4">
                                <h3 className="font-medium">{item.productDetails.name}</h3>
                                <p className="text-gray-600">Price: {item.productDetails.price}</p>
                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No items in the cart.</p>
                )}
            </div>

            {/* Address Section */}
            <div className="flex flex-col flex-1">
                <h4 className="text-lg font-semibold mb-4 text-gray-700">Selected Address:</h4>
                {userSelectedAddress ? (
                    <div className="border-b mb-4 pb-4 border-gray-300">
                        <p><strong>Full Name:</strong> {userSelectedAddress.fullName}</p>
                        <p><strong>City:</strong> {userSelectedAddress.city}</p>
                        <p><strong>State:</strong> {userSelectedAddress.state}</p>
                        <p><strong>Pin Code:</strong> {userSelectedAddress.pinCode}</p>
                        <p><strong>Contact No:</strong> {userSelectedAddress.number}</p>
                        <p><strong>Address:</strong> {userSelectedAddress.address}</p>
                    </div>
                ) : (
                    <p className="text-gray-600">No address selected yet.</p>
                )}
                <Button onClick={() => router.replace('/account')} className="mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                    {userSelectedAddress ? 'Edit Address' : 'Select Address'}
                </Button>
            </div>

            {/* Price Section */}
            <div className="flex flex-col flex-1 bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-black mb-2">Total Price: {totalPrice}</h3>
                <h3 className="text-lg text-green-500 mb-2">Total Saved Price: {totalSavedPrice}</h3>
                <hr className="bg-black mt-2 mb-2 h-1" />
                <h3 className="text-lg text-red-500 mb-4">Total Pay: {totalPrice + totalSavedPrice}</h3>
                <button onClick={handlePlaceOrder} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default Page;
