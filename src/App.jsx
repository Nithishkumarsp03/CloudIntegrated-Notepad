import './App.css';
import LoginPage from './screens/loginPage';
import Main from './screens/main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/TextEditor' element={<Main/>} ></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
