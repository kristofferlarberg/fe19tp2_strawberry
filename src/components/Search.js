import React, { Component } from 'react'
import { getVoteData } from '../functions/filter';
import ReactDOM from 'react-dom';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Renderer from './Data/Renderer';

export class Search extends Component {
    render() {
        let titleDates = getVoteData(3);
        
        return (

            <div>
                <Autocomplete
                    id="combo-box-demo"
                    options={titleDates.titleDates}
                    getOptionLabel={option => option.title}
                    style={{ width: 300 }}
                    renderInput={params => <TextField {...params} label="Välj votering.." variant="outlined" />}
                />
            </div>
        )
    }
}

export default Search
