import { useNavigate } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import MetricsCard from './MetricsCard';
import NotificationsList from './NotificationsList';
import CalendarWidget from './CalendarWidget';
import { dashboardData } from '../../data/mock-data';

const DashboardContainer = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader username="spotmkt" onLogout={handleLogout} />
            <main className="container mx-auto p-6">
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricsCard
                        title="Campanhas Ativas"
                        value={dashboardData.metrics.campaigns}
                    />
                    <MetricsCard
                        title="Impressões"
                        value={dashboardData.metrics.impressions.toLocaleString()}
                    />
                    <MetricsCard
                        title="Taxa de Conversão"
                        value={`${dashboardData.metrics.conversionRate}%`}
                    />
                </section>
                <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <NotificationsList notifications={dashboardData.notifications} />
                    <CalendarWidget events={dashboardData.calendar} />
                </section>
            </main>
        </div>
    );
};

export default DashboardContainer;