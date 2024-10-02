'use client'

import { getCurrentUser } from "@/services/user/getCurrUser"
import { createContext, useContext, useEffect, useState } from "react"

// Define the shape of the AppContext
interface AppContextType {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    isAuthUser: boolean;
    setIsAuthUser: React.Dispatch<React.SetStateAction<boolean>>;
    currUpdateProductDetails: {
        size: string;
        name: string;
        price: string;
        description: string;
        category: string;
        deliveryInfo: string;
        onSale: string;
        priceDrop: string;
    };
    setCurrUpdateProductDetails: React.Dispatch<React.SetStateAction<any>>;
    isOpenCart: boolean;
    setIsOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
    cartItemCount: number;
    setCartItemCount: React.Dispatch<React.SetStateAction<number>>;
    cartItems: any[];
    setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
    homePageData: {
        menData: any[];
        womenData: any[];
        kidData: any[];
    };
    setHomePageData: React.Dispatch<React.SetStateAction<any>>;
    userAddress: any[];
    setUserAddress: React.Dispatch<React.SetStateAction<any[]>>;
    allProductData: any[];
    setAllProductData: React.Dispatch<React.SetStateAction<any[]>>;
}

// Create the context with the correct type
export const AppContext = createContext<AppContextType | undefined>(undefined)

export default function AppContextProvider({ children }) {
    const [user, setUser] = useState({})
    const [isAuthUser, setIsAuthUser] = useState(false)
    const [currUpdateProductDetails, setCurrUpdateProductDetails] = useState({
        size: "",
        name: "",
        price: "",
        description: "",
        category: "",
        deliveryInfo: "",
        onSale: "No",
        priceDrop: "0",
    })
    const [isOpenCart, setIsOpenCart] = useState(false)
    const [cartItemCount, setCartItemCount] = useState(0)
    const [cartItems, setCartItems] = useState([]);
    const [homePageData, setHomePageData] = useState({
        menData: [],
        womenData: [],
        kidData: [],
    })
    const [userAddress, setUserAddress] = useState([]);
    const [allProductData, setAllProductData] = useState([]);



    useEffect(() => {
        const getUser = async () => {
            const response = getCurrentUser()
            if (response) {
                setUser(response)
                setIsAuthUser(true)
            } else {
                setUser({})
                setIsAuthUser(false)
            }
        }
        getUser()
    }, [])


    const allData = {
        user, setUser,
        isAuthUser, setIsAuthUser,
        currUpdateProductDetails, setCurrUpdateProductDetails,
        isOpenCart, setIsOpenCart,
        cartItemCount, setCartItemCount,
        cartItems, setCartItems,
        homePageData, setHomePageData,
        userAddress, setUserAddress,
        allProductData, setAllProductData
    }

    return (
        <AppContext.Provider value={allData}>
            {children}
        </AppContext.Provider>
    )
}

// Custom hook to use the AppContext
export const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider")
    }
    return context
}
