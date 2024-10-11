'use client'

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useRouter } from 'next/navigation';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Page = () => {
    // Data for the bar chart
    const router = useRouter()
    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Sales',
                data: [3000, 4000, 3200, 5000, 6200, 7500],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Sales',
            },
        },
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            {/* Header Section */}
            <div className="mb-6 text-center">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            </div>

            {/* Main Grid for Quick Actions */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                <div className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg">
                    <h2 className="text-lg font-semibold text-gray-700">Users</h2>
                    <p className="text-sm text-gray-500">Manage all users</p>
                </div>
                <div onClick={() => router.replace('/admin-view/all-order')} className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg">
                    <h2 className="text-lg font-semibold text-gray-700">Orders</h2>
                    <p className="text-sm text-gray-500">Track orders</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg">
                    <h2 className="text-lg font-semibold text-gray-700">Reports</h2>
                    <p className="text-sm text-gray-500">View reports</p>
                </div>
            </div>

            {/* Detailed Stats Section */}
            <div className="mt-6 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg">
                    <h2 className="text-lg font-semibold text-gray-700">Recent Activity</h2>
                    <ul className="mt-2 text-sm text-gray-600 space-y-1">
                        <li>User John Doe added a new product</li>
                        <li>Order #1234 was completed</li>
                        <li>Product "Winter Jacket" updated</li>
                    </ul>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg">
                    <h2 className="text-lg font-semibold text-gray-700">Statistics</h2>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <p className="text-2xl font-bold text-gray-800">120</p>
                            <p className="text-sm text-gray-500">Active Users</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800">30</p>
                            <p className="text-sm text-gray-500">New Orders</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Monthly Sales Graph */}
            <div className="mt-6 bg-white p-4 rounded-lg shadow-md hover:shadow-lg">
                <h2 className="text-lg font-semibold text-gray-700">Monthly Sales</h2>
                <div className="mt-4">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div>

            {/* Total Stats Section */}
            <div className="mt-6 bg-white p-4 rounded-lg shadow-md hover:shadow-lg">
                <h2 className="text-lg font-semibold text-gray-700">Total Overview</h2>
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold text-gray-800">500</p>
                        <p className="text-sm text-gray-500">Total Products</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-800">320</p>
                        <p className="text-sm text-gray-500">Total Sold</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-800">$12,000</p>
                        <p className="text-sm text-gray-500">Total Monthly Sales</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-800">$3,800</p>
                        <p className="text-sm text-gray-500">Total Individual Sales</p>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div className="mt-6 text-center">
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                    Generate Report
                </button>
            </div>
        </div >
    );
};

export default Page;
