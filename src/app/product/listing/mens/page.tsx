'use client'

import { getProduct } from '@/services/product';
import React, { useEffect, useState } from 'react'
import ProductCard from '@/components/product';
import { Footer } from '@/components/footer';

const Page = () => {

  const [menData, setMenData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


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
      <div className="flex min-h-screen w-full justify-center mt-[10px]">
        <div className="text-black flex flex-wrap gap-2 justify-center ">
          {menData.length !== 0 &&
            menData.map((product, index) => (
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
