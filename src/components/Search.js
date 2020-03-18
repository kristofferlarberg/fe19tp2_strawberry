import React from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ThemeProvider, createMuiTheme} from '@material-ui/core/styles'

const Search = props => {
    const voteData = props.data.getVoteData(3);
    const getTheme = props.ThemeProps !== 'dark' ? '#000' : '#fff';
    const invertGetTheme = props.ThemeProps === 'dark' ? '#000' : '#fff';
    const invertShade = props.ThemeProps === 'dark' ? '#272727' : '#f5f5f5'
    const svgCon = props.ThemeProps !== 'dark' ? 0 : 1;
    const theme = createMuiTheme({
        overrides: {
            MuiFormLabel: {
                root: {
                    color: getTheme
                }
            },
            MuiInputBase: {
                root: {
                    color: getTheme
                },                
            },
            MuiOutlinedInput : {
                root : {
                    '& $notchedOutline' : {
                        borderColor: getTheme
                    },
                    '&:hover $notchedOutline' : {
                        borderColor: getTheme
                    }
                }
            },
            MuiSvgIcon : {
                root : {
                    filter : 'invert('+svgCon+')'
                }
            },
            MuiAutocomplete : {
                option : {
                    backgroundColor :  invertGetTheme,
                    color : getTheme,
                    '&:hover' : {
                        backgroundColor : invertShade
                    },
                    '&:enabled' : {
                        backgroundColor: invertShade

                    },
                    '&[data-focus="true"]' : {
                        backgroundColor: invertShade
                    },
                    '&[aria-selected="true"]' : {
                        backgroundColor: invertShade
                    }
                },
                listbox : {
                    backgroundColor : invertGetTheme,
                    border: '2px solid '+invertGetTheme
                }          
            }
        }
    })
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
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
            </ThemeProvider> 
        </React.Fragment>
        
    );
};


export default Search;