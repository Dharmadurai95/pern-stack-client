import { Button, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react';
import { RestaurantFinder } from '../Apis/RestaurantFinder';
import { RestaurantContext } from '../Context/RestaurantContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';




const rating = [
    { label: "$", value: 1 },
    { label: "$$", value: 2 },
    { label: "$$$", value: 3 },
    { label: "$$$$", value: 4 },
    { label: "$$$$$", value: 5 },
];
function CreateNewRestaurant() {

    const [startRating, setstartRading] = React.useState({
        name: "",
        location: '',
        price_range: ''

    });
    const [showError, setshowError] = useState(false);

    let location = useLocation();
    const params = useParams();
    const navigate = useNavigate()

    const updatePage = location.pathname === `/restaurant/${params.id}/update`;

    const { state, dispatch } = useContext(RestaurantContext)

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setstartRading((prev) => ({ ...prev, price_range: value?.value || value }));
    };
    function onChangeHanlder(event) {
        setstartRading((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    async function submitHandler() {
        try {

            if (!startRating.name || !startRating.location || !startRating.price_range) return setshowError("Please fill the mandatory fields")
            if (updatePage) {
                const { data: updateResponse } = await RestaurantFinder.put(`/${params.id}`, startRating);
                console.log(updateResponse)
                if (updateResponse.status === 'success') {

                    setshowError("Successfully updated restaurant details!.")
                    setstartRading({
                        name: "",
                        location: '',
                        price_range: ''
                    })
                    setTimeout(() => {
                        navigate('/')
                    }, 2500)
                } else setshowError("Unable to updated restaurant details!.")


            } else {
                const { data: createresp } = await RestaurantFinder.post('/', startRating);
                const cloneData = [...state.restaurant, createresp.data.restaurant]
                dispatch({ restaurant: cloneData });
                setstartRading({
                    name: "",
                    location: '',
                    price_range: ''
                })
                setshowError("Successfully created new restaurant details!.")
            }
        } catch (e) {
            console.log(e)
            setshowError("Unable to create new record please try again.")
        }
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setshowError(false);
    };


    async function getSingleRestarantDetails(id) {
        try {

            const { data: restaurantList } = await RestaurantFinder.get(`/${id}`);
            console.log(restaurantList)
            const response = restaurantList?.data?.restaurant;
            if (!response) return setshowError("Unable to fetch restaurant details please try again.");

            setstartRading(response)


        } catch (error) {
            setshowError("Unable to fetch restaurant details please try again.")
            console.log(error)
        }
    }


    useEffect(() => {
        if (updatePage) {
            getSingleRestarantDetails(params.id)
        }
    }, [])
    const setDynamicwidth = updatePage ? { width: '60svw', m: 1 } : { m: 1 };
    return (
        <div onChange={onChangeHanlder}>
            <TextField value={startRating.name} required name="name" sx={setDynamicwidth} id="outlined-basic" label="Name" variant="outlined" />
            <TextField value={startRating.location} required name='location' sx={setDynamicwidth} id="outlined-basic" label="Location" variant="outlined" />
            <FormControl sx={{ m: 1, width: updatePage ? '60svw' : 300 }}>

                <InputLabel id="demo-select-small-label">Price Range</InputLabel>
                <Select
                    required
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={startRating.price_range}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>Price range</em>
                    </MenuItem>
                    {rating.map((item) => {
                        return <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>

                    })}

                </Select>

            </FormControl>
            <Button sx={{ m: 1 }} variant="contained" onClick={submitHandler}>Add</Button>
            <Snackbar
                open={!!showError}
                onClose={handleClose}
                autoHideDuration={5000}
                message={showError}
            />

        </div>
    )
}

export default CreateNewRestaurant