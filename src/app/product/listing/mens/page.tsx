'use client'

import { getProduct } from '@/services/product';
import React, { useEffect, useState } from 'react'
import ProductCard from '@/components/product';
import { Footer } from '@/components/footer';

const Page = () => {

  const [menData, setMenData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const truncateName = (name, maxLength) => {
    return name.length > maxLength ? name.substring(0, maxLength) + "..." : name;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getProduct('men');
      if (data && data.success) {
        setMenData(data.data);
      }

      setIsLoading(false);

    }

    fetchData()



  }, [])

  return (
    <>
      <div className="flex min-h-screen w-full justify-center mt-[10px] ">
        <div className="text-black flex flex-wrap gap-2 justify-center h-fit  ">
          {menData.length !== 0 &&
            menData.map((product, index) => (
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
