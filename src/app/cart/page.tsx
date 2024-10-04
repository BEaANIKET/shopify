'use client'


import { useEffect, useState } from 'react';
import { useAppContext } from '@/context';
import { Button } from '@/components/ui/button';
import { removeAllCartItems, removeCartItem, updateCartItemQuantity } from '@/services/cartServious/cartServious';

const CartPage = () => {
    const { cartItems, setCartItems, user } = useAppContext();
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalSavedPrice, setTotalSavedPrice] = useState(0);

    useEffect(() => {
        let total = 0;
        let saved = 0;

        cartItems.forEach((item) => {
            const itemTotal = item.productDetails.price * item.quantity;
            const savedAmount = itemTotal * (item.productDetails.priceDrop / 100);
            total += itemTotal;
            saved += savedAmount;
        });

        setTotalPrice(total);
        setTotalSavedPrice(saved);
    }, [cartItems]);

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

    const buyNow = async () => {

    }

    const handleCheckout = () => {
        // Navigate to the checkout page or handle the checkout process here
        console.log("Proceed to checkout");
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>

            {/* Cart Items Section */}
            <div className="space-y-4 ">
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div
                            key={item._id}
                            className="flex items-center border-b border-gray-200 py-4 justify-between"
                        >
                            <div className=' flex gap-3'>
                                <div className="w-20 h-20">
                                    <img
                                        src={item.productDetails.imageUrl}
                                        alt={item.productDetails.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>


                                <div className="flex flex-col pl-4">
                                    <h3 className="font-medium">{item.productDetails.name}</h3>
                                    <p className="text-gray-600">
                                        Price: ${item.productDetails.price}
                                    </p>
                                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                                </div>

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


                            <div className="text-right">
                                <p className="line-through text-red-500">
                                    Original Total: ₹{(item.productDetails.price * item.quantity).toFixed(2)}
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

            {/* Checkout Section */}
            <div className="mt-8 p-4 border border-gray-300 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Checkout Summary</h2>

                <div className="flex justify-between">
                    <p>Total Price:</p>
                    <p>${totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                    <p>Saved Price:</p>
                    <p className="text-green-500">-${totalSavedPrice.toFixed(2)}</p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between font-bold text-lg">
                    <p>Payable Price:</p>
                    <p>${(totalPrice - totalSavedPrice).toFixed(2)}</p>
                </div>

                <Button
                    className="w-full mt-6 bg-black text-white py-2 text-xl rounded-lg hover:bg-gray-300 hover:text-black active:scale-[.95] "
                    onClick={handleCheckout}
                >
                    Proceed to Checkout
                </Button>
            </div>
        </div>
    );
};

export default CartPage;
