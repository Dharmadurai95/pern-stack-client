import { Badge, Button, Chip, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { RestaurantFinder } from '../Apis/RestaurantFinder'
import { RestaurantContext } from '../Context/RestaurantContext'
import { useNavigate } from 'react-router-dom'
import StarRating from './StarRating'


export function renderRating(review) {
    return <>
        <Badge badgeContent={review?.count || "0"} color={review?.count ? "primary" : "warning"}>

            <StarRating length={review?.average_rating} />
        </Badge>
    </>
}

function RestaurantList() {
    const { state, dispatch } = useContext(RestaurantContext)
    const [showError, setshowError] = useState(false);

    async function getRestaurantList() {
        try {
            const { data: restaurantList } = await RestaurantFinder.get('/');
            dispatch(restaurantList.data)
        } catch (e) {
            setshowError("Unable to fetch the restaurant list.")

            console.log(e)
        }
    }

    useEffect(() => {
        getRestaurantList()
    }, [])
    const header = [
        { label: "Restaurant", align: "left" },
        { label: "Location", align: "right" },
        { label: "Price Range", align: "right" },
        { label: "Rating", align: "right" },
        { label: "Edit", align: "right" },
        { label: "Delete", align: "right" },
    ]
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    async function deleteHandler(e, id) {
        e.stopPropagation()
        try {

            const { data } = await RestaurantFinder.delete(`/${id}`);
            console.log(data)
            const filteredData = state.restaurant.filter((val) => val.id !== data.id);
            dispatch({ restaurant: filteredData })
            setshowError("Details deleted successfully")
        } catch (e) {
            console.log(e);
            setshowError("Unable to delete the restaurant data.")

        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setshowError(false);
    };
    const navigate = useNavigate()

    function updateHandler(e, id) {
        e.stopPropagation()
        navigate(`/restaurant/${id}/update`)
    }
    function handleViewDetails(id) {
        navigate(`/restaurant-details/${id}`)

    }


    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="customized table" >

                    <TableHead>
                        <TableRow hover>

                            {header.map((item) => {
                                return <StyledTableCell key={item.label} align={item.align}>{item.label}</StyledTableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {state?.restaurant?.map((data) => {
                            return <StyledTableRow key={data.id} hover onClick={() => handleViewDetails(data.id)}>

                                <StyledTableCell component="th" scope="row">
                                    {data.name}
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                    {data.location}
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                    {"$".padStart(data.price_range, '$')}
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                    {renderRating(data)}
                                </StyledTableCell>

                                <StyledTableCell align='right'>
                                    <Button color='warning' variant="contained" onClick={(e) => updateHandler(e, data.id)}>Update</Button>
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                    <Button color='error' variant="contained" onClick={(e) => deleteHandler(e, data.id)}>Delete</Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar
                open={!!showError}
                onClose={handleClose}
                autoHideDuration={5000}
                message={showError}
            />

        </>
    )
}

export default RestaurantList