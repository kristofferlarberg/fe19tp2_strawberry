import React from 'react';
import Renderer from '../../Data/Renderer';
import Data from '../../Data';
import Side from '../../Side';
import { withAuthorization } from '../../Session';
import Admin from '../Admin'
import * as ROLES from '../../../constants/roles';
import styled, { ThemeProvider } from 'styled-components'
import { GlobalStyles } from '../../Styles/global';
import { lightTheme, darkTheme } from '../../Styles/theme';


const Main = styled.div`
    display: grid;
    grid-template-columns: 300px 10fr;
`

const HomePage = ({ authUser }) => (

    <Main>
        <ThemeProvider theme={lightTheme}>
            <GlobalStyles />
            <Side />
            {authUser &&
                authUser.roles[ROLES.ADMIN] === ROLES.ADMIN ?
                <div>
                    <Data>
                        {/* <Renderer authUser={authUser} /> */}
                        <Admin />
                    </Data>
                </div>
                : <Data>
                    <Renderer authUser={authUser} />
                </Data>
            }
        </ThemeProvider>
    </Main>
);

//const condition = authUser => !!authUser;




export default HomePage;