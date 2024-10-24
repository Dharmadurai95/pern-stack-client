import React, { createContext, useState } from 'react'

export const RestaurantContext = createContext()
function RestaurantContextProvider(props) {
    const [restaurantList, setRestaurantList] = useState([])

    return (
        <RestaurantContext.Provider value={{
            state: restaurantList, dispatch: setRestaurantList
        }}>
            {props.children}
        </RestaurantContext.Provider>
    )
}

export default RestaurantContextProvider