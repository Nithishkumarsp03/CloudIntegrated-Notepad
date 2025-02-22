import React from 'react';
import '../styles/loginPage.css';
import { InputField } from '../components/inputField';
import { ButtonComponent } from '../components/button';
import googleIcon from '../assets/googleIcon.png';
import sendIcon from '../assets/sendIcon.png';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [text] = useTypewriter({
    words: ["Welcome to online Notepad", "Best Notepad out there"],
    loop: {},
    typeSpeed: 80
  });

  return (
    <div className='container'>
      <div className='content-box'>
        <div className='content1' style={{ color: 'white' }}>
          <div className='description'>
            <span className='type-text'>{text}</span>
            <Cursor />
            <p className='desc'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde tenetur quisquam
              dicta saepe recusandae repellendus suscipit, dolorem neque iure omnis ipsa cum
              voluptas! Vitae quisquam officiis magni magnam. Nam, excepturi.
            </p>
          </div>
          <div className='slope'></div>
        </div>

        <div className='loginPage'>
          <p className='heading'>Login to your account</p>
          <p className='para'>Select a method to log in</p>

          <p className='label'>Email</p>
          <InputField
            placeholder='UserName'
            styles={{ width: 'full', marginBottom: '14px' }}
            onChange={(e) => console.log(e)}
          />

          <p className='label'>Password</p>
          <InputField
            placeholder='Password'
            styles={{ width: 'full' }}
            type='password'
            onChange={(e) => console.log(e)}
          />

          <div className='lower-container'>
            <div className='password-container'>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox size='small' />}
                  label='Remember me'
                  sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}
                />
              </FormGroup>
              <p className='forgot-password'>Forgot password?</p>
            </div>

            <Link to='/TextEditor'>
            <ButtonComponent
              imgAnim={true}
              btnText='Login'
              endIcon={<img src={sendIcon} alt='send' width={16} height={16} />}
              />
            </Link>

            <p className='para' style={{ fontSize: '16px' }}>Or</p>

            <Link to='/TextEditor'>
            <ButtonComponent
              styles={{
                backgroundColor: '',
                color: 'black',
                border: '1px solid black',
                "&:hover": {
                  transform: "scaleY(1.02)",
                  transition: "0.4s",
                  backgroundColor: '#f0f0f0',
                  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                },
                "&:active": {
                  transform: "scale(0.98)",
                  backgroundColor: "#BDBDBD",
                  transition: "0.1s",
                  boxShadow: 'rgba(0, 0, 0, 0.45) 0px 2px 10px',
                },
              }}
              startIcon={<img width={20} height={20} src={googleIcon} alt='googleIcon' />}
              btnText='Sign in with Google'
              />
            </Link>


            <p className='register-account'>Don't have an account? Sign up here!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
