"use client";

import { Button } from "@/components/ui/button";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import logo from "./logo.png";
import { adminNavOptions, navOptions } from "@/utils/navitem";
import { Turret_Road } from "next/font/google";
import { useClickAway } from "@uidotdev/usehooks";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useAppContext } from "@/context";
import Cookies from "js-cookie";
import hamberger from "./image.png";
import cross from "./cross.png";
import cartLogo from './cartlogo.png'
import CartComponents from "../Cart";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { user, setUser, isAuthUser, setIsAuthUser, isOPenCart, setIsOpenCart, cartItemCount } = useAppContext();
  const path = usePathname();
  const isAdminView = path.includes("/admin-view");



  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const ref = useClickAway(() => {
    setIsMenuOpen(false);
  });


  const handleLogout = () => {
    setUser("");
    setIsAuthUser(false);
    Cookies.remove("token");
    router.replace("/");
  };

  const handleCartToggle = () => {
    setIsOpenCart(!isOPenCart)
  }

  return (
    <>
      <nav className="bg-black pt-4 pb-4 pl-3 pr-3 z-50  h-[100px] lg:h-fit sticky top-0 w-full">
        <div className="mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-white text-lg font-bold">
            <Image
              src={logo}
              width={150}
              height={100}
              alt="Picture of the author"
            />
          </div>

          <div className={" lg:flex absolute w-full  "}>
            <div className=" w-full mt-[80px] lg:mt-0 flex justify-center overflow-scroll ">
              {isAdminView
                ? adminNavOptions.map((item) => (
                  <>
                    <Button
                      onClick={() => router.push(`${item.path}`)}
                      className=" w-fit text-white"
                      key={item.id}
                      variant="link"
                    >
                      {" "}
                      {item.label}{" "}
                    </Button>
                    <hr />
                  </>
                ))
                : navOptions.map((item) => (
                  <>
                    <Button
                      onClick={() => router.push(`${item.path}`)}
                      className=" w-fit text-white"
                      key={item.id}
                      variant="link"
                    >
                      {" "}
                      {item.label}{" "}
                    </Button>
                    <hr />
                  </>
                ))}
            </div>
          </div>

          <div ref={ref} className="     ">
            <div className="flex relative items-center justify-center gap-1 ">
              <div className=" block z-10 " onClick={handleCartToggle}>
                <Image
                  src={cartLogo}
                  width={50}
                  height={50}
                  alt="Picture of the author"
                />
              </div>

              <div
                onClick={handleMenuClick}
                className=" w-fit h-fit z-40 right-0  flex items-center"
              >
                <Image
                  src={isMenuOpen ? cross : hamberger}
                  width={30}
                  height={30}
                  alt="Picture of the author"
                />
              </div>

              {/* item no.. */}
              <div className=" absolute w-[20px] h-[20px] top-[-3px] right-[27px]  rounded-full z-10 ">
                <div className=" w-full h-full flex text-center text-green-600  font-semibold text-xl ">
                  {cartItemCount <= 0 ? '' : cartItemCount}
                </div>
              </div>
            </div>


            {/*  mobile view */}
            <div
              className={`fixed top-0 right-0 h-full bg-black text-white shadow-lg transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
              style={{ width: '300px' }} // Increased width for the sidebar
            >
              <div className="flex items-center justify-center py-4 border-b h-[100px] border-gray-300">
                {/* Add Logo or other items here */}
              </div>

              <div className="flex flex-col p-4 space-y-2">
                {!isAuthUser ? (
                  <div onClick={() => router.replace('/sign-in')} className="p-3 rounded-md transition hover:bg-blue-600 duration-200 cursor-pointer text-center">
                    Login
                  </div>
                ) : (
                  <>
                    {
                      user?.role === 'Admin' ? (
                        isAdminView ? (
                          <>
                            <div onClick={() => router.replace('/')} className="p-3 rounded-md transition hover:bg-blue-600 duration-200 cursor-pointer text-center">
                              Client view
                            </div>
                            <hr />
                          </>

                        ) : (
                          <>
                            <div onClick={() => router.replace('/admin-view')} className="p-3 rounded-md transition hover:bg-blue-600 duration-200 cursor-pointer text-center">
                              Admin view
                            </div>
                            <hr />
                          </>

                        )
                      ) : null
                    }

                    <div onClick={() => router.replace('/account')} className="p-3 rounded-md  transition hover:bg-blue-600 duration-200 cursor-pointer text-center">
                      Account
                    </div>
                    <hr />
                    <div className="p-3 rounded-md  transition hover:bg-blue-600 duration-200 cursor-pointer text-center">
                      Cart
                    </div>
                    <hr />
                    <div className="p-3 rounded-md  transition hover:bg-blue-600 duration-200 cursor-pointer text-center">
                      Orders
                    </div>
                    <hr />
                    <div className="p-3 rounded-md  transition hover:bg-blue-600 duration-200 cursor-pointer text-center">
                      Wishlist
                    </div>
                    <hr />
                    <div className="p-3 rounded-md  transition hover:bg-blue-600 duration-200 cursor-pointer text-center">
                      Help
                    </div>
                    <hr />

                    {/* Logout Button */}
                    <div onClick={handleLogout} className="absolute bottom-4 left-4 right-4">
                      <div className="p-3 rounded-md bg-red-500 hover:bg-red-600 transition duration-200 cursor-pointer text-center">
                        Logout
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav >
    </>
  );
};
export default Navbar;
