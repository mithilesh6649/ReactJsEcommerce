import React from 'react';
import Layout from '../Layout';
const Dashboard = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-semibold mb-2">Total Users</h2>
                        <p className="text-3xl font-bold text-blue-600">1,234</p>
                        <p className="text-sm text-gray-500">+10% from last week</p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-semibold mb-2">Total Revenue</h2>
                        <p className="text-3xl font-bold text-green-600">$56,789</p>
                        <p className="text-sm text-gray-500">+15% from last month</p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-semibold mb-2">New Orders</h2>
                        <p className="text-3xl font-bold text-orange-600">89</p>
                        <p className="text-sm text-gray-500">+5% from last week</p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-semibold mb-2">Support Tickets</h2>
                        <p className="text-3xl font-bold text-red-600">27</p>
                        <p className="text-sm text-gray-500">-2 from last week</p>
                    </div>

                    {/* Card 5 */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-semibold mb-2">Active Campaigns</h2>
                        <p className="text-3xl font-bold text-purple-600">5</p>
                        <p className="text-sm text-gray-500">No change from last week</p>
                    </div>

                    {/* Card 6 */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-semibold mb-2">Monthly Visitors</h2>
                        <p className="text-3xl font-bold text-teal-600">10,456</p>
                        <p className="text-sm text-gray-500">+20% from last month</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
