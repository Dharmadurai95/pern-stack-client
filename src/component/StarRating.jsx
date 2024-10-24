import React from 'react'
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarRateIcon from '@mui/icons-material/StarRate';

function StarRating({ length }) {
    let starRating = [];
    for (let start = 1; start <= 5; start++) {
        if (start <= length) {
            starRating.push(<StarRateIcon color='warning' />)
        } else if (start === Math.ceil(length) && !Number.isInteger(length)) {
            starRating.push(<StarHalfIcon color='warning' />)
        } else starRating.push(<StarOutlineIcon color='warning' />)
    }
    return (
        <div style={{width:'auto'}}>{starRating}</div>
    )
}

export default StarRating