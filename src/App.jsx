import './App.css';
import LoginPage from './screens/loginPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './screens/main';
import Protect from './protected_routes/protect';
import ProfilePage from './screens/profilePage';

function App() {
  return (
    <div className="w-screen h-screen">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route element={<Protect/>}>
            <Route path='/textEditor/:id' element={<Main />} />
          </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
