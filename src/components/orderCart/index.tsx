import React, { useState } from 'react';

export const OrderCard = ({ order }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDetails = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`bg-white shadow-md rounded-lg p-4 transition-all duration-300 ${isExpanded ? 'h-auto' : 'h-fit'} overflow-hidden`}>
            <div className="flex items-center">
                {/* Product Image */}
                <img
                    src={order?.orderItem?.productDetails[0]?.imageUrl || '/default-product.jpg'}
                    alt={order?.orderItem?.productDetails[0]?.name || 'Product'}
                    className="w-16 h-16 object-cover rounded-md"
                />
                <div className="ml-4">
                    {/* Product Name */}
                    <h3 className="text-lg font-medium">{order?.orderItem?.productDetails[0]?.name}</h3>
                    {/* Product Price */}
                    <p className="text-gray-700 font-semibold">${Number(order?.orderItem?.productDetails[0]?.price).toFixed(2)}</p>
                </div>
            </div>

            {/* See More Button */}
            <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
                onClick={toggleDetails}
            >
                {isExpanded ? 'See Less' : 'See More'}
            </button>

            {/* Expanded Section */}
            {isExpanded && (
                <div className="mt-4">
                    {/* Order Status */}
                    <p className="text-gray-700">
                        <span className="font-semibold">Order Status:</span> {order.orderStatus}
                    </p>
                    {/* Payment Method */}
                    <p className="text-gray-700">
                        <span className="font-semibold">Payment Method:</span> {order.paymentMethod}
                    </p>
                    {/* Delivery Address */}
                    <p className="text-gray-700">
                        <span className="font-semibold">Delivery Address:</span> {order.deliveryAddressDetails.fullName}, {order.deliveryAddressDetails.address}, {order.deliveryAddressDetails.city}, {order.deliveryAddressDetails.state} - {order.deliveryAddressDetails.pinCode}, {order.deliveryAddressDetails.country}
                    </p>
                    {/* Tracking Number */}
                    <p className="text-gray-700">
                        <span className="font-semibold">Tracking Number:</span> {order.trackingNumber}
                    </p>
                </div>
            )}
        </div>
    );
};
