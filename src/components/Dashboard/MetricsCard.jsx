import React from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#4f46e5', '#818cf8', '#c7d2fe', '#e0e7ff'];

const MetricsCard = ({ title, value, chartType }) => {
    const renderContent = () => {
        if (chartType === 'pie' && Array.isArray(value)) {
            return (
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                        <Pie
                            data={value}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            innerRadius={40}
                            paddingAngle={5}
                            labelLine={true}
                        >
                            {value.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                    stroke="#fff"
                                    strokeWidth={2}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value, name) => [`${value}`, name]}
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                padding: '8px',
                            }}
                        />
                        <Legend
                            layout="horizontal"
                            align="center"
                            verticalAlign="bottom"
                            wrapperStyle={{ paddingTop: '10px' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            );
        } else if (chartType === 'bar' && Array.isArray(value)) {
            return (
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                        data={value}
                        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                    >
                        <XAxis
                            dataKey="name"
                            tick={{ fontSize: 12 }}
                            axisLine={{ stroke: '#e5e7eb' }}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 12 }}
                            axisLine={{ stroke: '#e5e7eb' }}
                            tickLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                padding: '8px',
                            }}
                        />
                        <Bar
                            dataKey="value"
                            fill="#4f46e5"
                            radius={[4, 4, 0, 0]}
                            barSize={30}
                        />
                    </BarChart>
                </ResponsiveContainer>
            );
        } else {
            return <p className="text-2xl font-bold text-gray-800">{value}</p>;
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all hover:shadow-xl">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            {renderContent()}
        </div>
    );
};

MetricsCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                value: PropTypes.number.isRequired,
            })
        ),
    ]).isRequired,
    chartType: PropTypes.oneOf(['pie', 'bar', 'none']),
};

MetricsCard.defaultProps = {
    chartType: 'none',
};

export default MetricsCard;