import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import CogWheel from './icons/cog-solid.svg';
import SearchIcon from './icons/search-solid.svg';
import EyeIcon from './icons/eye-solid.svg';
import StarIcon from './icons/star-solid.svg';
import LogIcon from './icons/sign-in-alt-solid.svg';
import LogPopup from './LogPopup';
import DN from './icons/dnLogo.png';
import SvD from './icons/SvDlogo.svg';
import ToggleDarkLight from './ToggleDarkLight';

const theme = {
    font_color: '#797979',
    darker_font: '#707070'
};

const SidenavDiv = styled.div`
    grid-column-start: 1;
    height: 100vh;
    position: fixed;
    width: 300px;
    z-index: 1;
    overflow-x: hidden;
    overflow-x: hidden;
`;

const SidenavMenu = styled.div`
    margin: 0 2rem;
`;

export const ULlist = styled.ul`
    list-style-type: none;
    padding: 0;
    > li {
        display: flex;
        flex-direction: row;
        justify-content: end;
    }
`;

const SettingsBox = styled.section`
    width: auto;
    display: flex;
    flex-direction: column;
    margin: 0 0.5rem 2rem 0.5rem;
`;

const SearchBarDiv = styled.div`
    display: flex;
    color: ${props => props.theme.color};
    margin-top: 2rem;
    justify-content: flex-start;
    flex-direction: row;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.3rem;
`;

const InputSearch = styled.input`
    background-color: transparent;
    border: none;
    outline: none;
    padding-left: 0.5rem;
    width: 150px;
    font-size: 1rem;
`;

const SearchHistoryDiv = styled.div`
    padding: 10px 0;
`;

const Icons = styled.img`
    height: 25px;
    margin-left: ${props => (props.right ? '-25px' : '0')};
    padding: ${props => (props.padding ? '0 .5rem' : '0')};
`;

const TextOverFlow = styled.h3`
    text-overflow: ellipsis;
    width: 11rem;
    font-style: italic;
    margin: 0.5rem;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    color: ${props => props.text};
`;

const LIWithImg = styled.li`
    align-items: center;
    padding: 0.3rem;
    user-select: none;
`;

export class Side extends Component {
    state = {
        login: false,
        settings: false
    };

    toggleLogin = () => {
        if (this.props.authUser) {
            this.props.firebase.doSignOut();
        } else {
            this.setState({
                login: !this.state.login
            });
        }
    };

    toggleSettings = () => {
        this.setState({
            settings: !this.state.settings
        });
    };

    render() {
        const { authUser } = this.props;
        const { login, settings } = this.state;
        return (
            <SidenavDiv className='side'>
                <div
                    style={{
                        backgroundColor: '#fff',
                        minWidth: '296px',
                        height: '100px',
                        borderTop: '5px solid red',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <img src={DN} style={{ height: '95px' }} />
                </div>
                <SidenavMenu>
                    <ULlist>
                        <LIWithImg>
                            <Icons
                                src={LogIcon}
                                style={{ cursor: 'pointer' }}
                                data-value='link'
                                onClick={this.toggleLogin}
                            />
                            <h3>Logga in</h3>
                        </LIWithImg>
                        {this.state.login ? (
                            <SettingsBox>
                                <LogPopup toggle={this.toggleLogin} />
                            </SettingsBox>
                        ) : null}
                        <LIWithImg>
                            <Icons
                                src={CogWheel}
                                style={{ cursor: 'pointer' }}
                                data-value='link'
                                onClick={this.toggleSettings}
                            />
                            <h3>Inställningar</h3>
                        </LIWithImg>

                        {this.state.settings ? (
                            <SettingsBox>
                                <ToggleDarkLight
                                    theme={this.props.theme}
                                    toggleTheme={this.props.toggleTheme}
                                />
                            </SettingsBox>
                        ) : null}

                        <LIWithImg>
                            <Icons src={EyeIcon} />
                            <h3>Bevakningar</h3>
                        </LIWithImg>
                    </ULlist>
                    <SearchHistoryDiv>
                        <SearchBarDiv>
                            <Icons src={SearchIcon} />
                            <InputSearch placeholder='Sök' />
                        </SearchBarDiv>
                        <ULlist>
                            {/* Example List */}
                            <li>
                                <TextOverFlow>
                                    SoU4 Äldrefrågor, förslagspunkt 8 -
                                    2020-02-13
                                </TextOverFlow>
                            </li>
                            <li>
                                <TextOverFlow>
                                    JuU18 Samarbete mellan svenska och norska
                                    särskilda insatsgrupper i krissituationer,
                                    förslagspunkt 3 - 2020-02-13
                                </TextOverFlow>
                            </li>
                            <li>
                                <TextOverFlow>
                                    TU6 Yrkestrafik och taxi, förslagspunkt 4 -
                                    2020-02-05
                                </TextOverFlow>
                            </li>
                        </ULlist>
                    </SearchHistoryDiv>
                </SidenavMenu>
            </SidenavDiv>
        );
    }
}

export default Side;
