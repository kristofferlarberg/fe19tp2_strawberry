import React, { Component } from 'react';

import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const url = `http://data.riksdagen.se/dokument/H701SoU4.text`;

let storedText;

class DocPopup extends React.Component {

  componentDidMount() { 
    if (storedText = '') {
    getText() => {
      fetch(url)
        .then((response) => {
          response.text().then((text) => {
            storedText = text;
            console.log(storedText);
            return storedText;
        });
      });
    }
  } else {
    console.log("So sorry");
  } 
  };
  
  render() {
    return <div>{ReactHtmlParser(storedText)}</div>;
  }
}

/* function done() {
  document.getElementById('log').textContent =
    "Here's what I got! \n" + storedText;
} */

export default DocPopup;