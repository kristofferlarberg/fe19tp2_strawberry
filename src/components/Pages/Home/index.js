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
<<<<<<< HEAD

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
=======
    <div style={{ display: 'flex' }}>
        <Side authUser={authUser} />
        {authUser &&
            authUser.roles[ROLES.ADMIN] === ROLES.ADMIN ?
            <div>
                <Data>
                    <Renderer authUser={authUser} />
                </Data>
            </div>
            :
            <div>
                <Data>
                    <Renderer authUser={authUser} />
                </Data>
            </div>
        }

    </div>
>>>>>>> bed4e56572e492583947bcd59c7de177eed5e83e
);

//const condition = authUser => !!authUser;




export default HomePage;