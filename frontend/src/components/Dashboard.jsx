import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Package, IndianRupee, AlertTriangle, TrendingDown } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const Dashboard = ({ products }) => {
  // Calculate KPIs
  const totalProducts = products.length;
  
  const totalStockValue = products.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);
  
  // Products with 5 or fewer items
  const lowStockItems = products.filter(item => Number(item.quantity) <= 5 && Number(item.quantity) > 0).length;
  
  // Products with 0 items
  const outOfStockItems = products.filter(item => Number(item.quantity) === 0).length;

  // Prepare chart data (Top 5 items by value)
  const chartData = [...products]
    .map(p => ({
      name: p.name.length > 15 ? p.name.substring(0, 15) + '...' : p.name,
      value: Number(p.price) * Number(p.quantity),
      quantity: Number(p.quantity)
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Formatter for Currency
  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(val);

  return (
    <div className="dashboard-container">
      <h2 className="section-title">Overview Options</h2>
      
      {/* KPI Cards Grid */}
      <div className="dashboard-grid">
        <div className="card metric-card">
          <div className="metric-info">
            <h3>Total Products</h3>
            <p className="metric-value">{totalProducts}</p>
          </div>
          <div className="metric-icon blue">
            <Package size={28} />
          </div>
        </div>
        
        <div className="card metric-card">
          <div className="metric-info">
            <h3>Total Stock Value</h3>
            <p className="metric-value">₹{totalStockValue.toLocaleString()}</p>
          </div>
          <div className="metric-icon green">
            <IndianRupee size={28} />
          </div>
        </div>
        
        <div className="card metric-card">
          <div className="metric-info">
            <h3>Low Stock Alerts</h3>
            <p className="metric-value">{lowStockItems}</p>
          </div>
          <div className="metric-icon orange">
            <AlertTriangle size={28} />
          </div>
        </div>
        
        <div className="card metric-card">
          <div className="metric-info">
            <h3>Out of Stock</h3>
            <p className="metric-value">{outOfStockItems}</p>
          </div>
          <div className="metric-icon red">
            <TrendingDown size={28} />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      {products.length > 0 && (
        <div className="charts-section">
          {/* Main Bar Chart */}
          <div className="card">
            <h3 className="section-title">Top Asset Value by Product</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(val) => `₹${val/1000}k`} />
                  <RechartsTooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                    formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Total Value']}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quantity Pie Chart */}
          <div className="card">
            <h3 className="section-title">Stock Quantity Distribution</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="quantity"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                    formatter={(value) => [value, 'Units']}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
