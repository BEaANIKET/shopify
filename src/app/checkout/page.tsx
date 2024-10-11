'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context';
import { Button } from "@/components/ui/button";
import { createOrder } from '@/services/order';

const Page = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, cartItems, userAddress, setUserAddress, userSelectedAddress, setUserSelectedAddress, selectedOrderProduct, setSelecetdOrderProduct } = useAppContext();
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalSavedPrice, setTotalSavedPrice] = useState(0);
    const [orderDetails, setOrderDetails] = useState({})
    const [payAmount, setPayAmount] = useState(0)
    const [showPopup, setShowPopup] = useState(false);



    useEffect(() => {
        let calculatedTotalPrice = 0;
        let calculatedTotalSavedAmount = 0;

        if (selectedOrderProduct.length > 0) {
            selectedOrderProduct.forEach(item => {
                const itemPrice = item.productDetails.price * item.quantity;
                const discount = (item.productDetails.price * item.productDetails.priceDrop / 100) * item.quantity;
                calculatedTotalPrice += itemPrice;
                calculatedTotalSavedAmount += discount;
            });
        }
        setTotalPrice(calculatedTotalPrice);
        setTotalSavedPrice(calculatedTotalSavedAmount);
        let pay = (calculatedTotalPrice - calculatedTotalSavedAmount).toFixed(2);
        setPayAmount(pay)
    }, [selectedOrderProduct]);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-GB');
    };

    const handlePlaceOrder = async () => {
        if (!user?.id || !userSelectedAddress || selectedOrderProduct.length === 0) {
            alert('Please fill all required fields');
            return;
        }

        try {
            const updatedOrderDetails = {
                user: user?.id || '',
                deliveryAddress: userSelectedAddress?._id || null,
                orderItem: selectedOrderProduct.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: (item.productDetails.price * item.quantity) - (item.productDetails.price * item.quantity * (item.productDetails.priceDrop / 100)),
                })),
                orderStatus: 'Pending',
                orderDate: formatDate(new Date()),
                paymentMethod: 'Online',
                deliveryStatus: 'Pending',
                paymentStatus: 'Pending',
                paymentRef: 'dfdfafad',
                trackingNumber: 'asfafaf'
            };

            setOrderDetails(updatedOrderDetails);
            setShowPopup(true)
        } catch (err) {
            setError('Failed to place order. Please try again.');
        }
    };

    const increaseQuantity = async (id) => {
        setSelecetdOrderProduct((prevItems) =>
            prevItems.map((item) =>
                item.productId === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = async (id, quantity) => {
        if (quantity > 1) {
            setSelecetdOrderProduct((prevItems) =>
                prevItems.map((item) =>
                    item.productId === id && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            );
        }
    };

    const removeItem = async (id) => {
        setSelecetdOrderProduct((prevItems) =>
            prevItems.filter(item => item.productId !== id)
        );
    };


    const handlePayment = () => {
        const response = createOrder(orderDetails).catch((err => console.log(err)))
        alert(`Payment of $${payAmount} completed!`);
        router.replace('/order')
        setShowPopup(false);
    };


    return (
        <div className="flex flex-col lg:max-w-6xl mx-auto gap-6 p-4">
            {/* Cart Items Section */}
            <div className="space-y-4 ">
                {selectedOrderProduct.length > 0 ? (
                    selectedOrderProduct.map((item) => (
                        <div
                            key={item._id}
                            className="flex items-center relative border-b border-gray-200 sm:py-4 py-2  justify-between"
                        >
                            <div className=' flex sm:gap-3 gap-1 items-center '>
                                <div className=' flex flex-col justify-center items-center'>
                                    <div className="w-20 h-20">
                                        <img
                                            src={item.productDetails.imageUrl}
                                            alt={item.productDetails.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex items-center mt-1 space-x-2 sm:hidden  justify-center">
                                        <button
                                            disabled={item.quantity <= 0}
                                            className="bg-gray-700 text-white p-1 rounded hover:bg-gray-600"
                                            onClick={() => decreaseQuantity(item.productId, item.quantity)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                                            </svg>

                                        </button>

                                        <span>{item.quantity}</span>

                                        <button
                                            className="bg-gray-700 text-white p-1 rounded hover:bg-gray-600"
                                            onClick={() => increaseQuantity(item.productId, item.quantity)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    </div>

                                </div>


                                <div className="flex flex-col pl-4">
                                    <h3 className="font-medium">{item.productDetails.name}</h3>
                                    <p className="text-gray-600">
                                        Price: ${item.productDetails.price}
                                    </p>
                                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                                </div>

                                <div className=" items-center mt-1 space-x-2 hidden sm:flex justify-center">
                                    <button
                                        disabled={item.quantity <= 0}
                                        className="bg-gray-700 text-white p-1 rounded hover:bg-gray-600"
                                        onClick={() => decreaseQuantity(item.productId, item.quantity)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                                        </svg>

                                    </button>

                                    <span>{item.quantity}</span>

                                    <button
                                        className="bg-gray-700 text-white p-1 rounded hover:bg-gray-600"
                                        onClick={() => increaseQuantity(item.productId, item.quantity)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                        </svg>
                                    </button>
                                </div>

                                <div className=" items-center space-x-4 hidden sm:flex h-full">
                                    <button
                                        className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600"
                                        onClick={() => removeItem(item.productId)}
                                    >
                                        Remove
                                    </button>
                                </div>

                                <div onClick={() => removeItem(item.productId)} className='sm:hidden absolute cursor-pointer top-0 right-0 '>❌</div>

                            </div>


                            <div className="text-right">
                                <p className="line-through text-red-500">
                                    Total: ₹{(item.productDetails.price * item.quantity).toFixed(2)}
                                </p>
                                <p className="text-green-500 font-semibold">
                                    Saved: {item.productDetails.priceDrop}%
                                </p>
                                <p className="text-lg font-semibold text-black">
                                    Pay: ₹{((item.productDetails.price * (1 - item.productDetails.priceDrop / 100)) * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Your cart is empty.</p>
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
                <Button onClick={() => router.replace('/account')} className="mt-4 bg-black active:scale-[.95] text-white py-2 rounded-lg ">
                    {userSelectedAddress ? 'Edit Address' : 'Select Address'}
                </Button>
            </div>

            {/* Price Section */}
            <div className="flex flex-col flex-1 bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-black mb-2 line-through ">Total Price: {totalPrice.toFixed(2)}</h3>
                <h3 className="text-lg text-green-500 mb-2">Total Saved Price: {totalSavedPrice.toFixed(2)}</h3>
                <hr className="bg-black mt-2 mb-2 h-1" />
                <h3 className="text-lg text-red-500 mb-4 font-bold">Total Pay: {payAmount}</h3>
                <button onClick={handlePlaceOrder} className="w-full bg-black text-white py-2 rounded-lg  active:scale-[.95]">
                    Place Order
                </button>
            </div>

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-xl font-semibold text-gray-800">Payment Confirmation</h2>
                        <p className="mt-4 text-lg">Amount to Pay: <strong>${payAmount}</strong></p>

                        <button
                            onClick={handlePayment}
                            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Pay Now
                        </button>
                    </div>
                </div>
            )}
        </div>


    );
};

export default Page;
