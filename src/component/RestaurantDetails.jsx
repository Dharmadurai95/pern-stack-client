import React, { useContext, useEffect } from 'react'
import Header from './Header'
import { Card, CardContent } from '@mui/material'
import StarRating from './StarRating'
import AddReview from './AddReview'
import { RestaurantContext } from '../Context/RestaurantContext'
import { useParams } from 'react-router-dom'
import { RestaurantFinder } from '../Apis/RestaurantFinder'
import { renderRating } from './RestaurantList'

function RestaurantDetails() {

    const { state, dispatch } = useContext(RestaurantContext);
    const params = useParams();
    console.log(params)


    useEffect(() => {
        async function getReviewDetails() {
            try {

                const { data } = await RestaurantFinder.get(`/${params.id}`)
                dispatch({
                    restaurant: state?.restaurant,
                    reviewDetail: data.data
                })
            } catch (error) {
                console.log(error)
            }
        }
        getReviewDetails()
    }, [])
    return (<>
        <Header title={state?.reviewDetail?.restaurant?.name} />
        {renderRating(state?.reviewDetail?.restaurant)}
        <Review review={state?.reviewDetail?.reviews} />
        <AddReview />
    </>
    )
}

export default RestaurantDetails


function Review({ review = [] }) {
    const cartHeader = {
        display: "flex",
        justifyContent: "space-between",
        color: 'white',
        marginBottom: "1rem",


    }
    if (!review.length) return null;

    return (<>
        <div style={{ display: "flex", gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>

            {review.map((obj) => {

                return <Card sx={{ width: 300, minHeight: 150, color: "", backgroundColor: 'dodgerblue' }} variant="outlined">

                    <CardContent>
                        <div style={cartHeader}>
                            <div>{obj.name}</div>
                            <StarRating length={obj.rating} />
                        </div>
                        <div style={{ color: 'white' }}>
                            {obj.review}
                        </div>

                    </CardContent>
                </Card>

            })}

        </div>

    </>)
}