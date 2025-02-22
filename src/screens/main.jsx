import React from 'react'
import '../styles/mainPage.css';    
import Appbar from '../components/appbar';
import RightContentMainPage from '../components/rightContentMainPage';
const Main = () => {

    
  return (
      <div className='mainPage'>
          <Appbar />
          <RightContentMainPage/>
    </div>
  )
}

export default Main
