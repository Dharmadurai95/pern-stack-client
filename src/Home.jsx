import React from 'react'
import Header from './component/Header'
import CreateNewRestaurant from './component/CreateNewRestaurant'
import RestaurantList from './component/RestaurantList'

function Home() {
    return (
        <>
            <Header title={'Restaurant Finder'}/>
            <CreateNewRestaurant />
            <RestaurantList />
        </>
    )
}

export default Home