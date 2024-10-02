"use client";

import ProductCard from "@/components/product";
import { useAppContext } from "@/context";
import { getAllData } from "@/services/getAllProduct";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const AllProduct = () => {

  const { allProductData, setAllProductData } = useAppContext();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const truncateName = (name, maxLength) => {
    return name.length > maxLength ? name.substring(0, maxLength) + "..." : name;
  };


  useEffect(() => {
    const fetchAllProductData = async () => {
      const response = await getAllData();
      if (response && response.success) {
        setAllProductData(response.allData);
      }
    };

    fetchAllProductData();

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex w-full justify-center">
      <div className="text-black flex flex-wrap gap-2 justify-center ">
        {allProductData.length !== 0 &&
          allProductData.map((product, index) => (
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
  );
};

export default AllProduct;
