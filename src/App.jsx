import './App.css';
import LoginPage from './screens/loginPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './screens/main';

function App() {
  return (
    <div className="w-screen h-screen">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/textEditor/:id' element={<Main/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
