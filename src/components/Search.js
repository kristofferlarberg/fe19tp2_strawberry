import React from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const Search = props => {
    const voteData = props.data.getVoteData(3);

    return (
        <>
            <Autocomplete
                id='combo-box-demo'
                onChange={props.handleChange}
                options={voteData.titleDates}
                getOptionLabel={option => option.title}
                style={{ width: '90%', marginRight: '20px' }}
                renderInput={params => (
                    <TextField
                        {...params}
                        label='Välj votering..'
                        variant='outlined'
                    />
                )}
            />
        </>
    );
};

export default Search;
