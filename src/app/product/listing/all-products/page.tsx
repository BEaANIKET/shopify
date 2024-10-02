'use client'

import { getProduct } from '@/services/product';
import React, { useEffect, useState } from 'react'
import ProductCard from '@/components/product';
import { Footer } from '@/components/footer';

const Page = () => {

  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const truncateName = (name, maxLength) => {
    return name.length > maxLength ? name.substring(0, maxLength) + "..." : name;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getProduct('all');
      if (data && data.success) {
        setAllData(data.data);
      }

      setIsLoading(false);

    }

    fetchData()

  }, [])

  return (
    <>
      <div className="flex w-full min-h-screen justify-center mt-[10px]">
        <div className="text-black flex flex-wrap gap-2 justify-center ">
          {allData.length !== 0 &&
            allData.map((product, index) => (
              <ProductCard
                key={index}
                product={{
                  ...product,
                  name: truncateName(product.name, 40),
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
