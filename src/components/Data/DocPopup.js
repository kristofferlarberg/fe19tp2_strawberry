import React, { Component } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import styled from 'styled-components';


//Den här behöver vara en prop som manipuleras och sedan skickas till render
/* let storedText; */

const DocBoxShadow = styled.div`
  position: absolute;
  top: 22%;
  box-sizing: border-box;
  box-shadow: 0px 0px 15px #aaa;
  margin: 0;
  width: 850px;
  height: 500px;
  border-radius: 10px;
  overflow: auto;
  padding: 15px;
  padding-top: 0px;
  background: white;
  z-index:1;
`
const Xspan = styled.span`
  display: inline-block;
  width: 100%; 
  font-size: 2rem;
  color: red; 
  cursor: pointer; 
  text-align: right; 
`

class DocPopup extends React.Component {
  state = {
    text: ''
  }

  componentDidMount() {
    const url = `http://data.riksdagen.se/dokument/${this.props.dok_id}`;
    console.log(url)
    this.getText(url);
  }

  getText(url) {
    fetch(url)
      .then((response) => {
        response.text().then((text) => {
          this.setState({ text })
        });
      });
  };

  render(props) {
    const { text } = this.state
    //Är det möjligt att lägga in prop här ist för string?
    return (

      <DocBoxShadow>
        <Xspan onClick={this.props.clickedPopup} data-value='x'> ×</Xspan>
        <div>{text && ReactHtmlParser(text)}</div>
      </DocBoxShadow>

    )
  }
}

export default DocPopup;