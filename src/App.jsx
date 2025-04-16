import './App.css';
import LoginPage from './screens/loginPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './screens/main';
import Protect from './protected_routes/protect';
import ProfilePage from './screens/profilePage';
import ForgotPassword from './screens/forgotPassword';
import OnboardingFlow from './screens/onBoardingFlow';
import EmptyStatePage from './screens/emptyPage';
import Tiptap from './demo/texteditor';
import TwoStepAuthentication from './screens/twoStepAuth';

function App() {
  return (
    <div className="w-screen h-screen">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route element={<Protect />}>
            <Route path='/forgotPassword' element={<ForgotPassword/>}/>
          <Route path='/profile' element={<ProfilePage />} />
            <Route path='/onBoarding-flow' element={<OnboardingFlow />} />
            <Route path='/textEditor' element={<EmptyStatePage/>}/>
            <Route path='/auth' element={<TwoStepAuthentication/>} />
            <Route path='/textEditor/:id' element={<Main />} />
          </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
