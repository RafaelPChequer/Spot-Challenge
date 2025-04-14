import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginContainer from './components/Login/LoginContainer';
import DashboardContainer from './components/Dashboard/DashboardContainer';

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginContainer />} />
            <Route path="/dashboard" element={<DashboardContainer />} />
        </Routes>
    </BrowserRouter>
);

export default AppRoutes;