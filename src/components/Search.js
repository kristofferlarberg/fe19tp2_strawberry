import React from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ThemeProvider, createMuiTheme} from '@material-ui/core/styles'

const Search = props => {
    const voteData = props.data.getVoteData(3);
    const getTheme = props.ThemeProps !== 'dark' ? '#000' : '#fff'
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
                }
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
