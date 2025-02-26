import React from 'react'
import '../styles/mainPage.css';    
import Appbar from '../components/appbar';
import RightContentMainPage from '../components/rightContentMainPage';
const Main = () => {

    
  return (
    <div className='mainPage' style={{ backgroundColor:"#f5f7fa"}}>
          <Appbar />
          <RightContentMainPage/>
    </div>
  )
}

export default Main
