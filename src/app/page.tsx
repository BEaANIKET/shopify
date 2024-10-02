'use client'
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { Footer } from '@/components/footer/index'
import b1 from '../../public/b1.png'
import b2 from '../../public/b2.png'
import b3 from '../../public/b3.png'
import Image from 'next/image';
import { getProduct } from '@/services/product';
import ProductCard from '@/components/product';
import { useAppContext } from '@/context';



const Home = () => {
  const banners = [
    b1, b2, b3,
  ];

  const { homePageData, setHomePageData } = useAppContext()


  useEffect(() => {
    const getData = async () => {
      const menData = await getProduct('men')
      const womenData = await getProduct('women')
      const kidData = await getProduct('kid')
      if (menData && womenData && kidData) {
        setHomePageData(prev => ({
          ...prev,
          menData: menData.data,
          womenData: womenData.data,
          kidData: kidData.data,
        }));
      }
    }

    getData();
  }, [])

  const handleNext = () => {
    const swiper = document.querySelector('.swiper').swiper;
    swiper.slideNext();
  };

  const handlePrev = () => {
    const swiper = document.querySelector('.swiper').swiper;
    swiper.slidePrev();
  };

  return (
    <div className="home-page">
      {/* Banner Section */}
      <section className="  flex items-center bg-green-100 relative z-10 w-full h-auto md:max-h-[70vh] overflow-hidden">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <Image
                src={banner}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Manual Controls */}
        <button
          onClick={handlePrev}
          className="absolute z-10 left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded"
        >
          &#60;
        </button>
        <button
          onClick={handleNext}
          className="absolute z-10 right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded"
        >
          &#62;
        </button>
      </section>

      {/* Men's Section */}
      <section className="my-8 ">
        <h2 className="text-2xl font-bold w-full shadow-sm p-4 shadow-black text-center mb-4">Men's Collection</h2>
        <div className="flex flex-row gap-2 overflow-x-scroll">
          {
            homePageData && homePageData.menData.length > 0 && homePageData.menData.map((item) => {
              return (
                <ProductCard product={item} />
              );
            })
          }
        </div>
      </section>

      {/* Women's Section */}
      <section className="my-8 overflow-x-scroll">
        <h2 className="text-2xl font-bold w-full shadow-sm p-4 shadow-black text-center mb-4">
          Women's Collection
        </h2>
        <div className="flex flex-row gap-2 overflow-x-scroll">
          {homePageData && homePageData.womenData.length > 0 &&
            homePageData.womenData.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
        </div>
      </section>

      {/* Kid's Section */}
      <section className="my-8">
        <h2 className="text-2xl w-full text-center shadow-sm p-4 shadow-black font-bold mb-4">Kid's Collection</h2>
        <div className=" flex flex-row gap-2 overflow-x-scroll ">
          {
            homePageData && homePageData.kidData.length > 0 && homePageData.kidData.map((item) => {
              return (
                <ProductCard product={item} />
              );
            })
          }
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
