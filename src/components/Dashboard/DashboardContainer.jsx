import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import MetricsCard from './MetricsCard';
import NotificationsList from './NotificationsList';
import CalendarWidget from './CalendarWidget';
import { dashboardData } from '../../data/mock-data';

const DashboardContainer = () => {
  const navigate = useNavigate();
  const [events] = useState([
    {
      id: 1,
      date: '2025-04-14',
      event: 'Reunião de Equipe',
      time: '14:00',
      location: 'Sala de Conferências',
      description: 'Planejamento do próximo sprint.',
    },
    {
      id: 2,
      date: '2025-04-15',
      event: 'Workshop de Marketing',
      time: '10:00',
      location: 'Auditório',
      description: 'Treinamento sobre novas estratégias digitais.',
    },
    {
      id: 3,
      date: '2025-04-20',
      event: 'Lançamento de Campanha',
      time: '09:00',
      description: 'Apresentação da nova campanha publicitária.',
    },
    {
      id: 4,
      date: '2025-04-25',
      event: 'Revisão de Métricas',
      time: '15:30',
      location: 'Sala 2',
      description: 'Análise de desempenho do trimestre.',
    },
  ]);

  const handleLogout = () => {
    navigate('/');
  };

  // Structured data for charts
  const campaignData = [
    { name: 'Social Media', value: 3 },
    { name: 'Email', value: 2 },
    { name: 'PPC', value: 1 },
  ];

  const impressionsData = [
    { name: '10/04', value: 12000 },
    { name: '11/04', value: 15000 },
    { name: '12/04', value: 10000 },
    { name: '13/04', value: 18000 },
  ];

  // Enhanced conversion rate data for a gauge-like effect
  const conversionRateData = [
    { name: 'Conversion', value: dashboardData.metrics.conversionRate },
    { name: 'Remaining', value: 100 - dashboardData.metrics.conversionRate },
  ];

  return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <DashboardHeader username="spotmkt" onLogout={handleLogout} />
        <main className="container mx-auto p-6">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricsCard
                title="Campanhas Ativas"
                value={campaignData}
                chartType="pie"
            />
            <MetricsCard
                title="Impressões"
                value={impressionsData}
                chartType="bar"
            />
            <MetricsCard
                title="Taxa de Conversão"
                value={conversionRateData}
                chartType="pie"
            />
          </section>
          <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <NotificationsList notifications={dashboardData.notifications} />
            <CalendarWidget events={events} />
          </section>
        </main>
      </div>
  );
};

export default DashboardContainer;