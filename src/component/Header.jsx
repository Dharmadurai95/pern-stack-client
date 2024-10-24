import { Typography } from '@mui/material'
import React from 'react'

function Header(props) {
    return (
        <Typography variant="h3" gutterBottom>
            {props.title}
        </Typography>
    )
}

export default Header