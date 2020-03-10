import React, { useState } from 'react';
import Renderer from '../../Data/Renderer';
import Data from '../../Data';
import Side from '../../Side';
import { withAuthorization } from '../../Session';
import Admin from '../Admin';
import * as ROLES from '../../../constants/roles';
import styled, { ThemeProvider, ThemeConsumer } from 'styled-components'
import { GlobalStyles } from '../../Styles/global';
import { lightTheme, darkTheme } from '../../Styles/theme';


const Main = styled.div`
    display: grid;
    grid-template-columns: 300px 10fr;
    overflow-y: scroll;
`

const HomePage = ({ authUser }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        // if the theme is not light, then set it to dark
        if (theme === 'light') {
            setTheme('dark');
            // otherwise, it should be light
        } else {
            setTheme('light');
        }
    }

    return (
        <ThemeProvider theme={theme == 'light' ? lightTheme : darkTheme}>
            <GlobalStyles />
            <Main>
                <Data>
                <Side theme={theme} toggleTheme={toggleTheme} />
                {authUser &&
                    authUser.roles[ROLES.ADMIN] === ROLES.ADMIN ?
                    <div>
                        <Admin />
                    </div>
                    : <Renderer authUser={authUser} />
                }
                </Data>
            </Main>
        </ThemeProvider>
    );
}

const condition = authUser => authUser && authUser.roles[ROLES.ADMIN];

export default withAuthorization(condition)(HomePage);
