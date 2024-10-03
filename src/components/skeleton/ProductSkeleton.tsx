
import React from "react";

export const ProductSkeleton = () => {
    return (
        <div className="max-w-sm w-[170px] min-w-[170px] lg:w-[250px] rounded h-fit overflow-hidden shadow-lg text-white cursor-pointer bg-gray-200 animate-pulse">
            {/* Image Skeleton */}
            <div className="w-full lg:h-[250px] h-[170px] bg-gray-300"></div>

            {/* Content Skeleton */}
            <div className="px-2 py-4">
                {/* Title Skeleton */}
                <div className="font-bold text-md lg:text-xl mb-2 h-[44px] bg-gray-300 rounded"></div>

                {/* Price Skeleton */}
                <p className="text-gray-700 text-base">
                    <span className="block bg-gray-300 w-20 h-4 mb-1 rounded"></span>
                    <span className="block bg-gray-300 w-16 h-4 mb-1 rounded"></span>
                    <span className="block bg-gray-300 w-24 h-6 mt-2 rounded float-right"></span>
                </p>

                {/* Button Skeleton */}
                <div className="w-full flex justify-center mt-4">
                    <div className="bg-gray-300 w-full py-2 rounded"></div>
                </div>
            </div>
        </div>
    );
};


export default ProductSkeleton;