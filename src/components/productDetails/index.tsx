import { useAppContext } from '@/context';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { addToCart } from '@/services/cartServious/cartServious';
import { useRouter } from 'next/navigation';

export const ProductDetails = ({ product }) => {

    const router = useRouter()
    const [addToCartLoader, setAddToCartLoader] = useState(false)
    const { cartItems, setCartItems, user, setSelecetdOrderProduct } = useAppContext()

    let handleClickCart = async () => {
        if (!user) {
            toast.error("Please login to add product to cart")
            return;
        }
        setAddToCartLoader(true);

        const newItems = {
            productDetails: {
                category: product.category,
                description: product.description,
                imageUrl: product.imageUrl,
                name: product.name,
                price: product.price,
                priceDrop: product.priceDrop,
                size: product.size,
            },
            productId: product._id,
            quantity: 1
        };

        const existingItemIndex = cartItems.findIndex((item) => item.productId === product._id);
        if (existingItemIndex === -1) {
            setCartItems([...cartItems, newItems]);
            try {
                const response = await addToCart(product._id, user.id);
                if (response.success) {
                    toast.success(response.message || "Cart added successfully");
                } else {
                    setCartItems(cartItems.filter(item => item.productId !== product._id));
                    toast.error("Failed to add product to cart");
                }
            } catch (error) {
                setCartItems(cartItems.filter(item => item.productId !== product._id));
            } finally {
                setAddToCartLoader(false);
            }
        } else {
            toast.error("already exist in a cart")
            setAddToCartLoader(false);
        }
    }

    const handleBuyNow = async () => {
        const orderData = [
            {
                productDetails: {
                    cetegory: product.category,
                    name: product.name,
                    price: product.price,
                    priceDrop: product.priceDrop,
                    description: product.description,
                    deliveryInfo: product.deliveryInfo,
                    imageUrl: product.imageUrl,
                    size: product.size,
                },
                productId: product._id,
                quantity: 1,
            }

        ]
        setSelecetdOrderProduct(orderData);
        router.replace('/checkout')
    }

    if (!product) {
        return <div> loading ...</div>
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row lg:space-x-8">

                {/* Left Section: Product Image */}
                <div className="w-full lg:w-1/2 flex justify-center">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-auto max-w-sm object-cover rounded-lg shadow-lg"
                    />
                </div>

                {/* Right Section: Product Details */}
                <div className="w-full lg:w-1/2 space-y-4">
                    {/* Product Name */}
                    <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

                    {/* Price and Discount */}
                    <div className="flex items-center space-x-4">
                        <span className="text-2xl font-bold text-green-500">₹{product.price}</span>
                        <span className="line-through text-gray-500">₹{Math.round(product.price / (1 - product.priceDrop / 100))}</span>
                        <span className="text-sm text-red-500">{product.priceDrop}% off</span>
                    </div>

                    {/* Product Description */}
                    <p className="text-lg text-gray-700">Description: {product.description}</p>

                    {/* Sizes */}
                    <div className="space-x-2">
                        <h3 className="text-md font-semibold">Size:</h3>
                        <div className="flex space-x-2">
                            {product.size.map((size, index) => (
                                <button key={index} className="px-4 py-2 border rounded-lg hover:bg-gray-200">
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Category */}
                    <p className="text-md text-gray-700">Category: {product.category.join(', ')}</p>

                    {/* Delivery Info */}
                    <p className="text-md text-gray-700">Delivery Info: {product.deliveryInfo}</p>

                    {/* Buttons */}
                    <div className="mt-4 flex space-x-4">
                        <button disabled={addToCartLoader} onClick={handleClickCart} className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">
                            Add to Cart
                        </button>
                        <button onClick={handleBuyNow} className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
