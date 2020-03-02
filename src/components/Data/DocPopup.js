import React, { Component } from 'react';

import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

//Den här behöver vara en prop som manipuleras och sedan skickas till render
/* let storedText; */



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
    return ( <div>{text && ReactHtmlParser(text)}</div>

    )
  }
}

/* function done() {
  document.getElementById('log').textContent =
    "Here's what I got! \n" + storedText;
} */

export default DocPopup;