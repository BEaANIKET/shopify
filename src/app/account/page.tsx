'use client'

import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/context';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { addNewAddress, deleteAddress, getAddress, updateAddress } from '@/services/address/addressServious';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type Address = {
    _id?: string;
    fullName: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
    country: string;
    number: Number
};

const Page: React.FC = () => {
    const { user } = useAppContext();
    const { userAddress, setUserAddress, userSelectedAddress, setUserSelectedAddress } = useAppContext();
    const [isEditingAddress, setIsEditingAddress] = useState<boolean>(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [removeLoading, setRemoveLoading] = useState<boolean>(false);
    const [fetchDataLoading, setFetchDataLoading] = useState<boolean>(false);


    const { register, handleSubmit, reset, formState: { errors } } = useForm<Address>({
        defaultValues: {
            fullName: '',
            address: '',
            city: '',
            state: '',
            pinCode: '',
            country: '',
            number: ''
        }
    });

    const router = useRouter()
    useEffect(() => {
        const getAddressData = async () => {
            setFetchDataLoading(true);
            const response = await getAddress();
            if (response.success) {
                setUserAddress(response.data);
            }
            setFetchDataLoading(false);
        };
        if (userAddress.length <= 0) {
            getAddressData();
        }
    }, [setUserAddress]);

    const handleAddNewAddress = () => {
        setShowForm(true);
        setIsEditingAddress(false);
        reset();
    };

    const handleEditAddress = (index: number) => {
        const address = userAddress[index];
        setShowForm(true);
        setIsEditingAddress(true);
        setEditIndex(index);
        reset(address);
    };

    const handleRemoveAddress = async (index: number, id: string) => {
        setRemoveLoading(true);
        try {
            const response = await deleteAddress(id);
            if (response && response.success) {
                toast.success("Address deleted successfully");
                setUserAddress((prev) => prev.filter((_, i) => i !== index));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setRemoveLoading(false);
        }
    };

    const onSubmit: SubmitHandler<Address> = async (data) => {
        setLoading(true);
        try {
            if (isEditingAddress && editIndex !== null) {
                const response = await updateAddress(data, data._id!);
                if (response && response.success) {
                    toast.success("Address updated successfully");
                    setUserAddress((prev) => {
                        const updatedAddresses = [...prev];
                        updatedAddresses[editIndex] = data;
                        return updatedAddresses;
                    });
                }
            } else {
                const response = await addNewAddress(data);
                if (response.success) {
                    toast.success("Address added successfully");
                    setUserAddress((prev) => [...prev, data]);
                }
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
            console.error(error);
        } finally {
            reset(data);
            setLoading(false);
            setShowForm(false);
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        reset();
    };

    const handleAddressBoxClick = (data) => {
        if (data._id === userSelectedAddress?._id) {
            localStorage.clear()
            setUserSelectedAddress(null);
        }
        else {
            setUserSelectedAddress(data)
        }
    }

    return (
        <div className='w-full min-h-screen p-2'>
            {/* User Details */}
            <div className='w-full border-2 border-black rounded-lg p-6 bg-gray-50 shadow-lg'>
                <h4 className='text-lg font-semibold mb-2 text-gray-700'>
                    Email: <span className='text-gray-900'>{user?.email}</span>
                </h4>
                <h4 className='text-lg font-semibold mb-2 text-gray-700'>
                    Name: <span className='text-gray-900'>{user?.firstName} {user?.lastName}</span>
                </h4>
                <h4 className='text-lg font-semibold mb-4 text-gray-700'>
                    Role: <span className='text-gray-900'>{user?.role}</span>
                </h4>
                <button className='bg-black text-white px-4 py-2 rounded hover:bg-white hover:text-black hover:border-2 hover:border-black transition-colors duration-300'>
                    View Our Orders
                </button>
                <button onClick={() => router.replace('/checkout')} className='bg-black ml-2 text-white px-4 py-2 rounded hover:bg-white hover:text-black hover:border-2 hover:border-black transition-colors duration-300'>
                    Got for Cheackout
                </button>
            </div>

            {
                fetchDataLoading ? (
                    <div className=' w-full h-full flex text-black justify-center items-center'>
                        <h4>Loading ...</h4>
                    </div>
                ) : (
                    <div className='w-full border-2 border-black rounded-lg p-6 bg-gray-50 shadow-lg mt-6'>
                        {
                            userAddress && userAddress.length > 0 ? (
                                <div >
                                    <h4 className='text-lg font-semibold mb-4 text-gray-700'>Saved Addresses:</h4>
                                    {userAddress.map((data: Address, index: number) => (
                                        <div key={index} className={`${userSelectedAddress?._id === data._id ? 'border-2 border-black ' : ''} border-b mb-4 pb-2 border-black`}>
                                            <p>FullName: {data.fullName}</p>
                                            <p>City: {data.city}</p>
                                            <p>State: {data.state}</p>
                                            <p>Pin Code: {data.pinCode}</p>
                                            <p>Address: {data.address}</p>
                                            <p>Contact number: {data.number}</p>
                                            <Button
                                                onClick={() => handleEditAddress(index)}
                                                className="mr-2"
                                            >
                                                Update
                                            </Button>
                                            <Button onClick={() => handleRemoveAddress(index, data._id!)}>
                                                Remove
                                            </Button>
                                            <Button className=' ml-2' onClick={() => handleAddressBoxClick(data)}>
                                                {data._id === userSelectedAddress?._id ? 'Selected' : 'Selecte Address'}
                                            </Button>

                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div>
                                    <h4 className='text-lg font-semibold mb-4 text-gray-700'>
                                        No Saved Address
                                    </h4>
                                </div>
                            )
                        }
                        <Button onClick={handleAddNewAddress}>
                            Add New Address
                        </Button>
                    </div>
                )
            }

            {/* Address Form */}
            {showForm && (
                <div className='mt-6 flex justify-start items-start'>
                    <form onSubmit={handleSubmit(onSubmit)} className='w-full relative max-w-md p-6 bg-white border border-gray-300 rounded-lg shadow-md'>
                        <button
                            type="button"
                            onClick={handleCloseForm}
                            className='absolute top-2 right-2 text-black bg-red-200 rounded-full w-6 h-6 text-sm flex items-center justify-center'>
                            X
                        </button>

                        <div className='mb-1'>
                            <label className='block text-gray-700 font-semibold mb-2'>Full Name</label>
                            <input
                                className={`w-full px-4 py-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                {...register("fullName", { required: "Full Name is required" })}
                                placeholder='Enter your full name'
                            />
                            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                        </div>

                        <div className='mb-1'>
                            <label className='block text-gray-700 font-semibold mb-2'>City</label>
                            <input
                                className={`w-full px-4 py-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                {...register("city", { required: "City is required" })}
                                placeholder='Enter your city'
                            />
                            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                        </div>

                        <div className='mb-1'>
                            <label className='block text-gray-700 font-semibold mb-2'>State</label>
                            <input
                                className={`w-full px-4 py-2 border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                {...register("state", { required: "State is required" })}
                                placeholder='Enter your state'
                            />
                            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                        </div>

                        <div className='mb-1'>
                            <label className='block text-gray-700 font-semibold mb-2'>Pin Code</label>
                            <input
                                className={`w-full px-4 py-2 border ${errors.pinCode ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                {...register("pinCode", {
                                    required: "Pin Code is required",
                                    pattern: { value: /^[0-9]{6}$/, message: "Invalid Pin Code" }
                                })}
                                placeholder='Enter your pin code'
                            />
                            {errors.pinCode && <p className="text-red-500 text-sm mt-1">{errors.pinCode.message}</p>}
                        </div>

                        <div className='mb-1'>
                            <label className='block text-gray-700 font-semibold mb-2'>Mobile No.</label>
                            <input
                                className={`w-full px-4 py-2 border ${errors.number ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                {...register("number", {
                                    required: "Mobile No. is required",
                                    pattern: { value: /^[0-9]{10}$/, message: "Invalid mobile no." }
                                })}
                                type='Number'
                                placeholder='Enter your mobile no.'
                            />
                            {errors.pinCode && <p className="text-red-500 text-sm mt-1">{errors.pinCode.message}</p>}
                        </div>

                        <div className='mb-1'>
                            <label className='block text-gray-700 font-semibold mb-2'>Address</label>
                            <textarea
                                className={`w-full px-4 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                {...register("address", { required: "Address is required" })}
                                placeholder='Enter your address'
                            />
                            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                        </div>

                        <div className='mb-1'>
                            <label className='block text-gray-700 font-semibold mb-2'>Country</label>
                            <input
                                className={`w-full px-4 py-2 border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                {...register("country", { required: "Country is required" })}
                                placeholder='Enter your country'
                            />
                            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
                        </div>

                        <Button type="submit" disabled={loading} className='w-full mt-4'>
                            {loading ? 'Saving...' : isEditingAddress ? 'Update Address' : 'Save Address'}
                        </Button>
                    </form>
                </div>
            )}


        </div>
    );
};

export default Page;
