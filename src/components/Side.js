import React, { Component } from 'react';
import styled, { ThemeProvider }  from 'styled-components';
// import { DataConsumer } from 'data/DataConsumer';
// import { getVoteData } from '../functions/filter';

const theme = {
    font_color: '#797979;',
    darker_font: '#707070'
}

const UserDiv = styled.div`
  height: 4rem;
  width: 200px;
  background-color: white;
`

const SidenavDiv = styled.div`
height:100vh;
min-width:200px;
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
  border: ${props => props.borded ? '1px solid ' + props.theme.font_color + '' : 'none'};
  border-radius:  ${props => props.borded ? '0.5rem' : '0'};
`

const InputSearch = styled.input`
  background-color:transparent;
  border:none;
  outline:none;
  padding-left:.5rem;
  font-size: 1rem;
`

const SomethingDiv = styled.div`
  color: ${props => props.theme.font_color};
`
const ULlist = styled.ul`
  list-style-type:none;
  padding:0;
`

const SearchHistoryDiv = styled.div`

`
const TextOverFlow = styled.p`
  text-overflow: ellipsis;
  width: 11rem;
  font-style: italic;
  white-space: nowrap;
  overflow: hidden;
  color: ${props => props.theme.font_color};
`


class Side extends React.Component {
    render() {

        return (
            <ThemeProvider theme={theme}>
                 <SidenavDiv>
                <UserDiv>
                   Side menu 
                </UserDiv>
                <SearchBarDiv borded>
                    <InputSearch placeholder='Sök'></InputSearch>
                </SearchBarDiv>
                <SomethingDiv>
                    <ULlist>
                        <li>
                            <h3>Inställningar</h3>
                        </li>
                        <li>
                            <h3>Bevakningar</h3>
                        </li>
                        <li>
                            <h3>Favoriter</h3>
                        </li>
                    </ULlist>
                    <SearchHistoryDiv>
                        <SearchBarDiv>
                            <InputSearch placeholder='Sök'/>
                        </SearchBarDiv>
                        <ULlist>
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

export default Side;