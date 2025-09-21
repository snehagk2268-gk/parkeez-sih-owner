import React from 'react';
import { Calendar, DollarSign, MapPin, TrendingUp, Users, Clock, Car } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Sample data - in real app, this would come from API
  const dashboardData = {
    todayBookings: 28,
    todayEarnings: 1250,
    availableSlots: 12,
    lastMonthEarnings: 23800,
    lastMonthBookings: 342,
    totalSlots: 40
  };

  const StatCard = ({ title, value, icon: Icon, color, subtitle }: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
    subtitle?: string;
  }) => (
    <div className="card p-6 hover:shadow-2xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl ${color.includes('green') ? 'bg-green-100' : 
          color.includes('blue') ? 'bg-royal-blue-100' : 
          color.includes('yellow') ? 'bg-yellow-100' : 'bg-purple-100'}`}>
          <Icon className={`h-8 w-8 ${color}`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-royal-blue-800">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your parking facility.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Today's Date</p>
          <p className="text-lg font-semibold text-gray-800">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>

      {/* Today's Stats */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <Calendar className="h-6 w-6 mr-2 text-royal-blue-600" />
          Today's Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Bookings Today"
            value={dashboardData.todayBookings}
            icon={Users}
            color="text-royal-blue-600"
            subtitle="vehicles parked"
          />
          <StatCard
            title="Earnings Today"
            value={`₹${dashboardData.todayEarnings.toLocaleString()}`}
            icon={DollarSign}
            color="text-green-600"
            subtitle="revenue generated"
          />
          <StatCard
            title="Available Slots"
            value={dashboardData.availableSlots}
            icon={MapPin}
            color="text-yellow-600"
            subtitle={`out of ${dashboardData.totalSlots} total`}
          />
        </div>
      </div>

      {/* Last Month Stats */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <TrendingUp className="h-6 w-6 mr-2 text-royal-blue-600" />
          Last Month's Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            title="Total Bookings"
            value={dashboardData.lastMonthBookings}
            icon={Car}
            color="text-purple-600"
            subtitle="vehicles serviced"
          />
          <StatCard
            title="Total Earnings"
            value={`₹${dashboardData.lastMonthEarnings.toLocaleString()}`}
            icon={DollarSign}
            color="text-green-600"
            subtitle="total revenue"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-royal-blue-600" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="btn-primary text-center">
            View Current Bookings
          </button>
          <button className="btn-secondary text-center">
            Update Property Details
          </button>
          <button className="btn-secondary text-center">
            Download Monthly Report
          </button>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h4 className="font-semibold text-gray-800 mb-4">Current Status</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Facility Status</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Open
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Watchman on Duty</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Available
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Occupancy Rate</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                70%
              </span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h4 className="font-semibold text-gray-800 mb-4">Recent Activity</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Vehicle parked in Slot A-12</span>
              <span className="text-gray-400">2 min ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Payment received ₹50</span>
              <span className="text-gray-400">5 min ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">Vehicle departed from Slot B-8</span>
              <span className="text-gray-400">12 min ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;