import React from 'react';
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import "../styles/SalesCharts.css";

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F', '#FFBB28', '#FF8042'];

const SalesCharts = ({ salesByCategory }) => {
    return (
        <div className="charts">
            <h2>Quantidade Vendida por Categoria</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={salesByCategory} dataKey="totalQuantity" nameKey="category" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                        {salesByCategory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
            <h2>Valor Vendido por Categoria</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={salesByCategory} dataKey="totalValue" nameKey="category" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" label>
                        {salesByCategory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SalesCharts;
