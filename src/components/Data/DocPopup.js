import React, { Component } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import styled from 'styled-components';


//Den här behöver vara en prop som manipuleras och sedan skickas till render
/* let storedText; */

const DocBoxShadow = styled.div`
  position: relative;
  top:-350px;
  left: -100px;
  box-shadow: 0px 0px 15px #aaa;
  margin: 0;
  width: 850px;
  height: 500px;
  border-radius: 10px;
  overflow: auto;
  padding: 15px;
  background: white;
`


class DocPopup extends React.Component {
  state = {
    text: ''
  }

  componentDidMount() {
    this.getText();
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
    const url = `http://data.riksdagen.se/dokument/${this.props.dok_id}`;
    this.getText(url);

    const {text} = this.state
    //Är det möjligt att lägga in prop här ist för string?
    return (<DocBoxShadow onClick={this.props.handleClick}><div>{text && ReactHtmlParser(text)}</div></DocBoxShadow>

    )
  }
}

export default DocPopup;