import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const Votering = ({voteringInfo}) => 
 <main>
 {voteringInfo ? voteringInfo.map (item => {
   return <section><h1>{item.title}</h1>
     <p>{item.description}</p></section>
 }) : 'Cannot find data.'
}
 </main>

        
export default Votering;