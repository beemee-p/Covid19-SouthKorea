import React from 'react'
import './css/Header.css';
import covid19_logo from './img/covid19_logo.png';
const Header = () => {
 
  return (
    <header className="header">
      <img  src={covid19_logo} alt="covid19_logo"/>
      <select>
        <option>국내</option>
        <option>세계</option>
      </select>
    </header>
  )
}

export default Header

