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
import { ShareNote } from './screens/editorDisplay';
import NotePad from './screens/notePad';
import { useLoginStore } from './store/loginStore';
import { useEffect } from 'react';
import { Toaster } from "sonner";

function App() {
  const timer = useLoginStore(state => state.timer);
  const runTimer = useLoginStore(state => state.runTimer);

  useEffect(() => {
    runTimer();
  }, [timer]);
  
  return (
    <div className="w-screen h-screen">
      <BrowserRouter>
        <Toaster position="top-center" richColors />
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/onBoarding-flow' element={<OnboardingFlow />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/twoStepAuth' element={<TwoStepAuthentication />} />
          <Route path='/share/:id' element={<ShareNote/>} />
          <Route element={<Protect />}>
            <Route path='/' element={<NotePad />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/notes' element={<EmptyStatePage />} />
            <Route path='/note-pad/:id' element={<Main />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
