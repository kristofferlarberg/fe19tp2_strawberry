import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withData } from './Data';
import { makeStyles } from "@material-ui/core/styles";
import styled, { ThemeProvider } from 'styled-components';
import { createGlobalStyle } from 'styled-components';
/* 
 const useStyles = makeStyles(theme => ({
    inputRoot: {
         color: ${({ theme }) => theme.text},
        "& .MuiOutlinedInput-notchedOutline": {
             borderColor: $({ theme }) => theme.text},
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: ${ ({ theme }) => theme.text },
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: ${ ({ theme }) => theme.text },
        },

    }


})); */

const Search = (props) => {
    const voteData = props.data.getVoteData(3);
    /* const classes = useStyles(); */
    return (
    <>
        <Autocomplete
            id="combo-box-demo"
            /* classes={classes} */
            onChange={props.handleChange}
            options={voteData.titleDates}
            getOptionLabel={option => option.title}
            style={{ width: '90%', marginRight: '20px'}}
                renderInput={params => <TextField /* classes={classes} */{...params} label="Välj votering.."  variant="outlined" />}
        />
    </>)
}


export default Search
