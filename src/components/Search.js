import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withData } from './Data';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    inputRoot: {
        color: "purple",
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "green"
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "red"
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "purple"
        },

        overrides: {
            MuiFormLabel: { // Name of the component ⚛️ / style sheet
                root: { // Name of the rule
                    color: "orange",
                    "&$focused": { // increase the specificity for the pseudo class
                        color: "red"
                    }
                }
            }
        }
    }


}));

const Search = (props) => {
    const voteData = props.data.getVoteData(3);
    const classes = useStyles();
    return (
    <>
        <Autocomplete
            id="combo-box-demo"
            classes={classes}
            onChange={props.handleChange}
            options={voteData.titleDates}
            getOptionLabel={option => option.title}
            style={{ width: '90%', marginRight: '20px'}}
                renderInput={params => <TextField classes={classes}{...params} label="Välj votering.."  variant="outlined" />}
        />
    </>)
}


export default Search
