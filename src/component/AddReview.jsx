import { Button, FormControl, Input, InputLabel, Rating, Snackbar, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react';
import './addReview.css'
import { RestaurantFinder } from '../Apis/RestaurantFinder';
import { useParams } from 'react-router-dom';
import { RestaurantContext } from '../Context/RestaurantContext';
function AddReview() {
    const params = useParams()
    const { state: updateContext, dispatch } = useContext(RestaurantContext);
    const [state, setState] = useState({ rating: 0, name: '', review: "" });
    const [showError, setShowError] = useState(false)
    async function submitHandler() {
        try {

            const { rating, name, review } = state;
            if (!rating || !name || !review) return setShowError("Please fill out all the fields");
            const { data: review_data } = await RestaurantFinder.post(`/${params.id}/addReview`, state);
            console.log(review_data, 'review_data')

            setState({ rating: 0, name: '', review: "" });
            dispatch({
                ...updateContext,
                reviewDetail:{
                    ...updateContext.reviewDetail,
                    reviews:[...updateContext?.reviewDetail?.reviews,review_data.data]
                }
            })
            setShowError("Review updated successfully.")
        } catch (e) {
            console.log(e)
            setShowError("Unable to update review details")
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowError(false);
    };

    return (
        <>

            <div style={{ display: 'flex', justifyContent: "space-between" }}>

                <TextField value={state.name} id="name" onChange={(e) => setState((pre) => ({ ...pre, name: e.target.value }))} required name="name" sx={{ width: '50svw' }} label="Name" variant="outlined" />
                <div>

                    <Typography component="legend">Rating</Typography>

                    <Rating
                        name="simple-controlled"
                        value={state.rating}
                        onChange={(event, newValue) => {
                            setState(prev => ({ ...prev, rating: newValue }));
                        }}
                    />
                </div>
            </div>
            <InputLabel sx={{ m: 1, width: 300 }} id="review">Review</InputLabel>

            <textarea value={state.review} className={"textAreaStyle"} id='demo-select-small-label' onChange={(e) => setState(p => ({ ...p, review: e.target.value }))} />
            <Button sx={{ m: 1 }} variant="contained" onClick={submitHandler}>Add</Button>
            <Snackbar
                open={!!showError}
                onClose={handleClose}
                autoHideDuration={5000}
                message={showError}
            />

        </>
    )
}

export default AddReview