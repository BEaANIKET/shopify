// components/ProductCard.js
"use client";

import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";
import { deleteProduct } from "@/services/product";
import toast from 'react-hot-toast'
import { Loader2 } from "lucide-react"
import { addToCart } from "@/services/cartServious/cartServious";
import { log } from "console";

export const ProductCard = ({ product }) => {
  const { imageUrl, name, price, priceDrop } = product;
  const path = usePathname();
  const isAdminView = path.includes("/admin-view");
  const router = useRouter();
  const { setCurrUpdateProductDetails, user, cartItems, setCartItems, allProductData, setAllProductData, setSelecetdOrderProduct, selectedOrderProduct } = useAppContext();
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [addToCartLoader, setAddToCartLoader] = useState(false)


  let discountPrice = (price, priceDrop) => {
    let discountedPrice = price - (priceDrop / 100) * price;
    return parseFloat(discountedPrice.toFixed(2));
  };

  const nameOptimize = (name) => {
    if (name.length <= 35) {
      return name;
    } else {
      return name.slice(0, 35) + "...";
    }
  };

  let handleDeleteProduct = async () => {
    setDeleteLoading(true)
    try {
      const response = await deleteProduct(product._id)
      if (response.success) {
        setAllProductData((prev) => prev.filter(item => item._id !== product._id))
        setCartItems((prev) => prev.filter(item => item.productId !== product._id))
        toast.success("Product deleted successfully")

      }
    } catch {
      console.error("Failed to delete product")
    } finally {
      setDeleteLoading(false)
    }
  }

  let handleCartClick = async () => {
    if (!user) {
      toast.error("Please login to add product to cart")
      return;
    }
    setAddToCartLoader(true);

    const newItems = {
      productDetails: {
        category: product.category,
        description: product.description,
        imageUrl: product.imageUrl,
        name: product.name,
        price: product.price,
        priceDrop: product.priceDrop,
        size: product.size,
      },
      productId: product._id,
      quantity: 1
    };

    const existingItemIndex = cartItems.findIndex((item) => item.productId === product._id);
    if (existingItemIndex === -1) {
      setCartItems([...cartItems, newItems]);
      try {
        const response = await addToCart(product._id, user.id);
        if (response.success) {
          toast.success(response.message || "Cart added successfully");
        } else {
          setCartItems(cartItems.filter(item => item.productId !== product._id));
          toast.error("Failed to add product to cart");
        }
      } catch (error) {
        setCartItems(cartItems.filter(item => item.productId !== product._id));
      } finally {
        setAddToCartLoader(false);
      }
    } else {
      toast.error("already exist in a cart")
      setAddToCartLoader(false);
    }
  }

  const handleClickOnProduct = () => {
    router.push(`/product/listing/productdetails/${product._id}`);
  }

  const buyNow = async () => {
    const orderData = [
      {
        productDetails: {
          cetegory: product.category,
          name: product.name,
          price: product.price,
          priceDrop: product.priceDrop,
          description: product.description,
          deliveryInfo: product.deliveryInfo,
          imageUrl: product.imageUrl,
          size: product.size,
        },
        productId: product._id,
        quantity: 1,
      }

    ]
    setSelecetdOrderProduct(orderData);
    router.replace('/checkout')
  }

  product.priceDrop = String(product.priceDrop)

  return (
    <div className="max-w-sm w-[170px] min-w-[170px]  lg:w-[250px] rounded h-fit overflow-hidden shadow-lg text-white cursor-pointer ">
      <img onClick={handleClickOnProduct} className="w-full lg:h-[250px] h-[170px] " src={imageUrl} alt={name} />
      <div className="px-2 py-4">
        <div className="font-bold text-md lg:text-xl mb-2  h-[44px]">
          {nameOptimize(name)}
        </div>
        <p className="text-gray-700 text-base">
          <span className="line-through text-red-500 mr-1">${price}</span>
          <span className="text-green-500 mr-2">-{priceDrop}% </span>
          <span className="text-black float-right font-bold text-xl lg:text-2xl">
            ${discountPrice(Number(price), Number(priceDrop))}
          </span>
        </p>
        {isAdminView ? (
          <div className=" flex w-full flex-col gap-1 ">
            <Button
              onClick={() => {
                router.replace(`/admin-view/updateProduct/${product._id}`);
                setCurrUpdateProductDetails(product);
              }}
              className=" bg-black py-1"
            >
              Update
            </Button>
            <Button onClick={handleDeleteProduct} className=" bg-black py-1"> {deleteLoading ? <Loader2 className=" bg-white absolute right-3 mr-2 h-4 w-4 animate-spin" /> : 'Delete'} </Button>
          </div>
        ) : (
          <div className="w-full flex justify-center space-x-4">
            {/* Buy Now Button */}
            <Button
              onClick={buyNow}
              className="bg-blue-500 text-white px-6 py-2 rounded-md font-semibold transition-colors duration-300 active:scale-[.95] disabled:opacity-50"
            >
              Buy Now
            </Button>

            {/* Add to Cart Button */}
            <button onClick={handleCartClick} disabled={addToCartLoader} className=" active:scale-[.90] flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 mr-2"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a1 1 0 0 0 1 .78H19a1 1 0 0 0 1-.78L23 6H6"></path>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
