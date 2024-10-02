
'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from "next/navigation";
import { getProductById } from '@/services/product';
import ProductDetails from '@/components/productDetails';


const Page = () => {
    const params = useParams()
    const Id = params?.id
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const getProductData = async () => {
            const response = await getProductById(Id)
            if (response && response.success) {
                setProduct(response.product)
            }
        }
        getProductData()
    }, [])

    return (
        <div className=' w-full h-fit '>
            {product && <ProductDetails product={product} />}
        </div>
    )
}

export default Page