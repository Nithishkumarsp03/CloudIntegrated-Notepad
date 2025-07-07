import { Outlet } from 'react-router-dom';
import LoginPage from '../screens/loginPage';
import { useLoginStore } from '../store/loginStore';

const Protect = () => {
    const token = useLoginStore(e => e.token);
    return token  ? <Outlet /> : <LoginPage />;
}

export default Protect;