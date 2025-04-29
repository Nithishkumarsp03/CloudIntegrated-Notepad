import './App.css';
import LoginPage from './screens/loginPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './screens/main';
import Protect from './protected_routes/protect';
import ProfilePage from './screens/profilePage';
import ForgotPassword from './screens/forgotPassword';
import OnboardingFlow from './screens/onBoardingFlow';
import EmptyStatePage from './screens/emptyPage';
import TwoStepAuthentication from './screens/twoStepAuth';
import TextEditorDisplay from './screens/editorDisplay';

function App() {
  return (
    <div className="w-screen h-screen">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LoginPage />} />
              <Route path='/onBoarding-flow' element={<OnboardingFlow />} />
              <Route path='/forgotPassword' element={<ForgotPassword/>}/>
              <Route path='/twoStepAuth' element={<TwoStepAuthentication/>} />
            <Route element={<Protect />}>
            <Route path='/profile' element={<ProfilePage />} />
              <Route path='/notes' element={<EmptyStatePage/>}/>
            <Route path='/note-pad/:id' element={<Main />} />
            <Route path='/shareEditor/:id' element = {<TextEditorDisplay/>}/>
            </Route>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
