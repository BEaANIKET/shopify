'use client'

import { getProduct } from '@/services/product';
import React, { useEffect, useState } from 'react'
import ProductCard from '@/components/product';
import { Footer } from '@/components/footer';

const Page = () => {

  const [womenData, setWomenData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const truncateName = (name, maxLength) => {
    return name.length > maxLength ? name.substring(0, maxLength) + "..." : name;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getProduct('women');
      if (data && data.success) {
        setWomenData(data.data);
      }

      setIsLoading(false);

    }

    fetchData()


  }, [])

  return (
    <>
      <div className="flex w-full min-h-screen justify-center mt-[10px]">
        <div className="text-black flex flex-wrap gap-2 justify-center h-fit  ">
          {womenData.length !== 0 &&
            womenData.map((product, index) => (
              <ProductCard
                key={index}
                product={{
                  ...product,
                  name: truncateName(product.name, 20),
                }}
              />
            ))}
        </div>
      </div>
      <Footer />
    </>

  )
}

export default Page
