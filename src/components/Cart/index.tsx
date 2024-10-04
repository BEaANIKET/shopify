'use client'

import { useAppContext } from '@/context';
import React, { useEffect, useState } from 'react';
import { useClickAway } from "@uidotdev/usehooks";
import { getCartItems, updateCartItemQuantity, removeCartItem, removeAllCartItems } from '@/services/cartServious/cartServious';
import toast from 'react-hot-toast';
import cross from './cross.png'
import Image from "next/image";
import { useRouter } from 'next/navigation';


export const CartComponents = () => {
    const { isOpenCart, setIsOpenCart, setCartItemCount, cartItems, setCartItems, user, selectedOrderProduct, setSelecetdOrderProduct } = useAppContext();
    const ref = useClickAway(() => setIsOpenCart(false));
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalSavedPrice, setTotalSavedPrice] = useState(0);
    // fetch data from backed to update cartitems
    useEffect(() => {
        if (user?.id) {
            const fetchCartItems = async () => {
                try {
                    setLoading(true); // Start loading state
                    const response = await getCartItems(user.id);
                    if (response && response.success) {
                        setCartItems(response.data);
                    } else {
                        throw new Error('Failed to fetch cart items');
                    }
                } catch (error) {
                    setError(error.message); // Set error message
                    toast.error(`Error fetching cart items: ${error.message}`);
                } finally {
                    setLoading(false); // End loading state
                }
            };
            fetchCartItems();
        }
        else {
            setCartItems([])
            setCartItemCount(0)
        }
    }, [user?.id]);


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
        setCartItemCount(cartItems.length)
    }, [cartItems])

    const increaseQuantity = async (id, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.productId === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
        await updateCartItemQuantity(id, user.id, quantity + 1)
    };

    const decreaseQuantity = async (id, quantity) => {
        if (quantity > 1) {
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.productId === id && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            );

            await updateCartItemQuantity(id, user.id, quantity - 1)
        }

    };

    const removeItem = async (id) => {
        setCartItems((prevItems) =>
            prevItems.filter(item => item.productId !== id)
        )
        await removeCartItem(id, user.id)
    };

    const removeAllItems = async () => {
        setCartItems([]);
        await removeAllCartItems()

    }



    const handleCloseCartMenu = () => {
        setIsOpenCart(false)
    }

    const handleCheckout = () => {
        setSelecetdOrderProduct(cartItems)
        router.replace('/checkout');
    };


    return (
        <div ref={ref} className={`fixed w-fit  top-0 right-0  bg-black  z-50 transition-transform duration-300 ease-in-out  ${isOpenCart ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className=' w-[350px] sm:max-w-[400px] h-screen flex flex-col '>

                <div className="h-full w-full shadow-lg p-1 sm:p-6 space-y-6 overflow-y-scroll ">

                    {/* Loading State */}
                    {
                        !user && (
                            <div className="text-white">Please sign in to view your cart</div>
                        )
                    }
                    {user && loading && (
                        <div className="text-white">Loading cart items...</div>
                    )}

                    {/* Error Handling */}
                    {error && (
                        <div className="text-red-500">Error: {error}</div>
                    )}

                    {/* Cart Header */}
                    <div className="text-xl font-bold text-white flex justify-between items-center mb-4">
                        <span>Your Cart</span>
                        <div className=' flex gap-2'>
                            <button className="text-red-400 hover:text-red-500" onClick={removeAllItems}>
                                Clear All
                            </button>
                            <div
                                onClick={handleCloseCartMenu}
                                className={`w-fit h-fit z-40 right-0  flex items-center ${isOpenCart ? 'flex' : 'hidden'} `}
                            >
                                <Image
                                    src={cross}
                                    width={30}
                                    height={30}
                                    alt="Picture of the author"
                                />
                            </div>
                        </div>

                    </div>

                    {/* Cart Product Items */}
                    <div className="space-y-4">
                        {cartItems.map((item) => {
                            const originalPrice = parseFloat(item.productDetails.price);
                            const discount = (item.productDetails.priceDrop / 100) * originalPrice;
                            const actualPrice = originalPrice - discount;

                            return (
                                <div key={item._id} className="flex relative items-center justify-between bg-gray-900 text-white p-4 rounded-lg shadow-sm">

                                    {/* Left Section - Product Image */}
                                    <div className="w-1/4">
                                        <img onClick={() => router.replace(`/product/listing/productdetails/${item.productId}`)} src={item.productDetails.imageUrl} alt={item.productDetails.name} className="w-full h-auto rounded-md object-cover" />

                                        {/* Quantity Controls below Image */}
                                        <div className="flex items-center mt-1 space-x-2 justify-center">
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

                                    {/* Right Section - Product Info */}
                                    <div className="w-3/4 pl-4">
                                        {/* Product Name */}
                                        <p className="font-semibold">{item.productDetails.name}</p>

                                        {/* Product Size and Description */}
                                        <p className="text-sm">Size: {item.productDetails.size.join(", ")}</p>

                                        {/* Price and Price Drop */}
                                        <div className="flex items-center mt-2">
                                            <p className="text-green-400 font-bold">↓ {item.productDetails.priceDrop}%</p>
                                            <p className="ml-2 text-gray-400 line-through">₹{originalPrice * item.quantity}</p>
                                            <p className="ml-2 text-white font-semibold">₹{(actualPrice * item.quantity).toFixed(2)}</p>
                                        </div>

                                        {/* Total and Savings */}
                                        <div className="mt-1">
                                            <p className="text-sm text-green-400">Total Saved: ₹{(discount * item.quantity).toFixed(2)}</p>
                                            <p className="text-sm text-red-400">Total Pay: ₹{(actualPrice * item.quantity).toFixed(2)}</p>
                                        </div>
                                        <div onClick={() => removeItem(item.productId)} className=' absolute cursor-pointer top-4 right-4 '>❌</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* Cart Summary */}
                <div className="bg-gray-900 text-white p-2 rounded-lg shadow-sm">
                    <div className="flex justify-between mb-2">
                        <span>Total:</span>
                        <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-green-400">
                        <span>You Saved:</span>
                        <span>₹{totalSavedPrice.toFixed(2)}</span>
                    </div>
                    <button onClick={handleCheckout} className="w-full mt-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200">
                        Checkout
                    </button>
                </div>
            </div>
        </div>

    );
};

export default CartComponents;
