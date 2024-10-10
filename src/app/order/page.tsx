'use client'

import { OrderCard } from "@/components/orderCart";
import { getOrder } from "@/services/order";
import React, { useEffect, useState } from "react";

const Page = () => {
    const [orders, setOrders] = useState([]);
    const [expandedOrders, setExpandedOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getOrder();
            if (response?.success) {
                setOrders(response.orders);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => (
                    <OrderCard key={order._id} order={order} />
                ))}
            </div>
        </div>
    )
}

export default Page;
