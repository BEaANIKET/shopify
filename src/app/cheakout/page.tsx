'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context';

export const Page = () => {

    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, cartItems, userAddress, setUserAddress } = useAppContext()




    return (
        <div>
            <h1> Helo I am cheakout page what about you</h1>
        </div>
    );
};

export default Page;
