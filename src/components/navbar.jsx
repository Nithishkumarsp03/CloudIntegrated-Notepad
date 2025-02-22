import React from 'react';
import { ButtonComponent } from './button';
import '../styles/navbar.css';

const Navbar = () => {
  return (
    <div className='navbar'>  
          <div className='buttons'>
              <ButtonComponent
              btnText="+"
              />
              <ButtonComponent
                  btnText="Save"
                  
              />
              <ButtonComponent
              btnText="Save as draft"
              />
      </div>
      <div className='tab-container'>

      </div>
    </div>
  )
}

export default Navbar;
