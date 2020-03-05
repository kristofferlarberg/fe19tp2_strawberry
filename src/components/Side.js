import React, { Component } from 'react';
import UserStatus from './Pages/UserStatus'
import styled, { ThemeProvider } from 'styled-components';
import CogWheel from './icons/cog-solid.svg'
import SearchIcon from './icons/search-solid.svg'
import EyeIcon from './icons/eye-solid.svg'
import StarIcon from './icons/star-solid.svg'
import LogIcon from './icons/sign-in-alt-solid.svg'
import LogPopup from './LogPopup';
import DN from './icons/dnLogo.png';

import Search from './Search';
// import { DataConsumer } from 'data/DataConsumer';
// import { getVoteData } from '../functions/filter';
import Renderer from './Data/Renderer';

const theme = {
    font_color: '#797979',
    darker_font: '#707070'
}

const UserDiv = styled.div`
    height: 4rem;
    width: 200px;
    padding:10px;
`

const SidenavDiv = styled.div`
    height:100vh;
    min-width:270px;
    max-width:296px;
    z-index:1;
    overflow-x:hidden;
    top: 0;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items:center;
    left: 0;
    background-color: #DDD;
    overflow-x: hidden;
`
const DataDiv = styled.div`
    margin-left:150px;
    padding:0 10px;
`

const SearchBarDiv = styled.div`
    display: flex;
    color: ${props => props.theme.font_color};
    margin-top:2rem;
    justify-content: flex-start;
    flex-direction: row;
    font-size: 1rem;
    font-weight: bold;
    padding: .3rem;
`

const InputSearch = styled.input`
    background-color:transparent;
    border:none;
    outline:none;
    padding-left:.5rem;
    width:150px;
    font-size: 1rem;
`

const SomethingDiv = styled.div`
  color: ${props => props.theme.font_color};
      margin: 50px;
`
const ULlist = styled.ul`
    list-style-type:none;
    padding:0;
    display: flex;
    align-itmes:center;
    flex-direction: column;
    > li{
        display: flex;
        flex-direction: row;
        justify-content: end;
        
  }
`
const SearchHistoryDiv = styled.div`
    padding:5px 0;
`

const Icons = styled.img`
    height:25px;
    margin-left: ${props => props.right ? '-25px' : '0'};
    padding: ${props => props.padding ? '0 .5rem' : '0'};
`

const TextOverFlow = styled.h3`
    text-overflow: ellipsis;
    width: 11rem;
    font-style: italic;
    margin:.5rem;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    color: ${props => props.theme.font_color};
`

const LIWithImg = styled.li`
    display:flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items:center;
    padding: .3rem;
`

export class Side extends React.Component {

    state = {
        seen: false
    };

    togglePop = () => {
        this.setState({
            seen: !this.state.seen
        });
    };
render() {
    return (
        <ThemeProvider theme={theme}>
            <SidenavDiv>
                <div style={{ backgroundColor: '#fff', minWidth: '296px', height: '100px', borderTop: '5px solid red', display: 'flex', justifyContent: 'center'}}><img src={DN} style={{height:'95px'}}/></div>
{/*                 <UserDiv>
                    <UserStatus />
                </UserDiv> */}
                {/*                 <SearchBarDiv borded>
                    <InputSearch placeholder='Sök'></InputSearch>
                    <Icons src={SearchIcon} right/>
                </SearchBarDiv> */}
                <SomethingDiv>
                    <ULlist>
                        <LIWithImg>
                            <Icons src={LogIcon} style={{cursor:'pointer'}}padding data-value='link' onClick={this.togglePop}/>
                            <h3>Logga in</h3>
                        </LIWithImg>
                        <div>{this.state.seen ? <LogPopup toggle={this.togglePop} /> : null}
                    </div>
                        <LIWithImg>
                            <Icons src={CogWheel} padding />
                            <h3>Inställningar</h3>
                        </LIWithImg>
                        <LIWithImg>
                            <Icons src={EyeIcon} padding />
                            <h3>Bevakningar</h3>
                        </LIWithImg>
                        <LIWithImg>
                            <Icons src={StarIcon} padding />
                            <h3>Favoriter</h3>
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
                                    SoU4
Äldrefrågor, förslagspunkt 8 - 2020-02-13</TextOverFlow>
                            </li>
                            <li>
                                <TextOverFlow>
                                    JuU18
Samarbete mellan svenska och norska särskilda insatsgrupper i krissituationer, förslagspunkt 3 - 2020-02-13</TextOverFlow>
                            </li>
                            <li>
                                <TextOverFlow>
                                    TU6
    Yrkestrafik och taxi, förslagspunkt 4 - 2020-02-05
                                </TextOverFlow>
                            </li>
                        </ULlist>
                    </SearchHistoryDiv>
                </SomethingDiv>
            </SidenavDiv>
        </ThemeProvider>

    );
}
}

export default Side