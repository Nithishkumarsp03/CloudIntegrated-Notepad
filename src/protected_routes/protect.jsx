import { Outlet, useNavigate } from 'react-router-dom';
import LoginPage from '../screens/loginPage';

const Protect = () => {
    const token = localStorage.getItem("token");
    return token  ? <Outlet /> : <LoginPage />;
}

export default Protect;