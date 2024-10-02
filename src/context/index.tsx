
'use client'

import { getCurrentUser } from "@/services/user/getCurrUser"
import { createContext, useContext, useEffect, useState } from "react"


export const AppContext = createContext({})
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


    const allData = { user, setUser, isAuthUser, setIsAuthUser, currUpdateProductDetails, setCurrUpdateProductDetails, isOpenCart, setIsOpenCart, cartItemCount, setCartItemCount, cartItems, setCartItems, homePageData, setHomePageData, userAddress, setUserAddress, allProductData, setAllProductData }

    return (
        <AppContext.Provider value={allData}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}

