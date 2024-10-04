'use client'

import React from 'react';

const Page = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">

            {/* Main Content */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-lg p-6">
                    <ul className="space-y-6">
                        <li>
                            <button className="w-full text-left py-2 px-4 bg-blue-500 text-white rounded-md">Dashboard</button>
                        </li>
                        <li>
                            <button className="w-full text-left py-2 px-4 hover:bg-blue-200">Users</button>
                        </li>
                        <li>
                            <button className="w-full text-left py-2 px-4 hover:bg-blue-200">Products</button>
                        </li>
                        <li>
                            <button className="w-full text-left py-2 px-4 hover:bg-blue-200">Orders</button>
                        </li>
                        <li>
                            <button className="w-full text-left py-2 px-4 hover:bg-blue-200">Reports</button>
                        </li>
                    </ul>
                </aside>

                {/* Main Panel */}
                <main className="flex-1 p-8">
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                        <div className="grid grid-cols-4 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-bold">Total Users</h3>
                                <p className="mt-2 text-4xl font-bold">1,245</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-bold">Total Products</h3>
                                <p className="mt-2 text-4xl font-bold">456</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-bold">Total Orders</h3>
                                <p className="mt-2 text-4xl font-bold">678</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-bold">Revenue</h3>
                                <p className="mt-2 text-4xl font-bold">$123,456</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">User Management</h2>
                        <table className="w-full bg-white shadow-lg rounded-lg">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-3 px-4 text-left">User ID</th>
                                    <th className="py-3 px-4 text-left">Name</th>
                                    <th className="py-3 px-4 text-left">Email</th>
                                    <th className="py-3 px-4 text-left">Role</th>
                                    <th className="py-3 px-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Example Data */}
                                <tr>
                                    <td className="py-3 px-4">1234</td>
                                    <td className="py-3 px-4">John Doe</td>
                                    <td className="py-3 px-4">johndoe@example.com</td>
                                    <td className="py-3 px-4">Admin</td>
                                    <td className="py-3 px-4">
                                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2">Edit</button>
                                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg">Delete</button>
                                    </td>
                                </tr>
                                {/* Additional Rows */}
                            </tbody>
                        </table>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Product Management</h2>
                        <table className="w-full bg-white shadow-lg rounded-lg">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-3 px-4 text-left">Product ID</th>
                                    <th className="py-3 px-4 text-left">Name</th>
                                    <th className="py-3 px-4 text-left">Price</th>
                                    <th className="py-3 px-4 text-left">Stock</th>
                                    <th className="py-3 px-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Example Data */}
                                <tr>
                                    <td className="py-3 px-4">5678</td>
                                    <td className="py-3 px-4">Laptop</td>
                                    <td className="py-3 px-4">$999</td>
                                    <td className="py-3 px-4">15</td>
                                    <td className="py-3 px-4">
                                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2">Edit</button>
                                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg">Delete</button>
                                    </td>
                                </tr>
                                {/* Additional Rows */}
                            </tbody>
                        </table>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Page;
