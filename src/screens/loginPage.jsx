import React from 'react';
import '../styles/loginPage.css';
import { InputField } from '../components/inputField';
import { ButtonComponent } from '../components/button';
import googleIcon from '../assets/googleIcon.png'
import sendIcon from '../assets/sendIcon.png';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import FallingCharacters from '../components/fallingCharacters';
import useEditorStore from '../globalStore';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import notePad from '../assets/notepad.png';
import pencil from '../assets/pencil.png';
import eraser from '../assets/eraserImage.png';
import WaterDrop from '../assets/svgs/waterDrop';

const LoginPage = () => {

  const { login, setUserName, setPassword } = useEditorStore();

  return (
    <div className='container'>
      <div className='waterDrop'><WaterDrop width={70} height={70} /></div>
      <div className='waterDrop2'><WaterDrop width={100} height={100} fill="#C30E59" /></div>
      <div className="waterDrop3"><WaterDrop width={50} height={50} fill="#B6FFA1" /></div>
      <div className="waterDrop4"><WaterDrop width={120} height={120} fill="#81DAE3" /></div>
      <div className="waterDrop5"><WaterDrop width={120} height={120} fill="#81DAE3" /></div>
      <div className="waterDrop6"><WaterDrop width={10} height={10} fill="#81DAE3" /></div>
      <FallingCharacters />
      <div className='content-box'>

        <div className='content1' style={{ color: 'white' }}>
          <div className="Drop1"><WaterDrop width={10} height={10} fill="#FFF4E6" /></div>
          <div className="Drop2"><WaterDrop width={10} height={10} fill="#FFC145" /></div>
          <div className="Drop3"></div>
          <img src={eraser} alt='eraser'className='eraser' />
          <img src={notePad} alt='notepad' className='notepad'/>
          <img src={pencil} alt='pencil'  className='pencil' />
          <p className='heading' style={{color:"white",marginTop:'50px'}}>Online Notepad</p>
          <p className='para' style={{color:'white'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit.fdgdf gfdggdfggg </p>
        </div>

        <div className='loginPage'>
          <img src={logo} alt='logo' width={50} height={50} className='logo' />

          <p className='heading'>Welcome Back</p>

          <p className='para'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. A esse quo impedit.</p>

          <InputField
            placeholder="UserName"
            styles={{
              width: 'full',
              marginTop: '20px',
            }}
            value={login.userName}
            onChange={(e) => setUserName(e)}
          />

          <InputField
            placeholder="Password"
            styles={{
              width: 'full',
              marginTop: '22px',
            }}
            type={'password'}
            value={login.password}
            onChange={(e) => setPassword(e)}
          />

          <div className='lower-container'>
            <div className='lower-content'>
              <div className='password-container'>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox size='small' />}
                    label="Remember me"
                    sx={{ "& .MuiTypography-root": { fontSize: "14px" } }} // Reduce font size
                  />
                </FormGroup>
                <p className='forgot-password'>Forgot password?</p>
              </div>

              <ButtonComponent
                imgAnim={true}
                btnText='Login'
                endIcon={<img src={sendIcon} alt="send" width={20} height={20} />}
              />

              <p className='para' sx={{ fontSize: { xl:'18px',md:'14px'} }}>Or</p>

              <Link to='/textEditor/1'>
                <ButtonComponent
                  styles={{
                    backgroundColor: '', color: "black", border: '1px solid black',
                    "&:hover": {
                      transform: "scaleY(1.02)",
                      transition: "0.4s",
                      backgroundColor: '#f0f0f0', // Light grey on hover
                      boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                    },
                    "&:active": {
                      transform: "scale(0.98)",
                      backgroundColor: "#BDBDBD", // Slightly darker grey when clicked
                      transition: "0.1s",
                      boxShadow: 'rgba(0, 0, 0, 0.45) 0px 2px 10px'
                    },
                  }}
                  startIcon={<img width={20} height={20} src={googleIcon} alt='googleIcon' />}
                  btnText='Sign in with google'
                />
              </Link>
            </div>
            <p className='register-account' >Don't have an account? Sign up here!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;
