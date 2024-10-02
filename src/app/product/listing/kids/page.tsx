'use client'

import { getProduct } from '@/services/product';
import React, { useEffect, useState } from 'react'
import ProductCard from '@/components/product';
import { Footer } from '@/components/footer';

export const Page = () => {

  const [kidData, setKidData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  const truncateName = (name, maxLength) => {
    return name.length > maxLength ? name.substring(0, maxLength) + "..." : name;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getProduct('kid');
      if (data && data.success) {
        setKidData(data.data);
      }

      setIsLoading(false);

    }

    fetchData()

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, [])

  return (
    <>
      <div className="flex w-full min-h-screen justify-center mt-[10px]">
        <div className="text-black flex  flex-wrap gap-2 justify-center ">
          {kidData.length !== 0 &&
            kidData.map((product, index) => (
              <ProductCard
                key={index}
                product={{
                  ...product,
                  name: truncateName(product.name, windowWidth < 990 ? 20 : 40),
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
