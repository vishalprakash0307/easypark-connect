
import React from 'react';
import { MapPin, Car, Settings } from 'lucide-react';
import StatCard from '@/components/StatCard';
import { Statistics, User } from '@/types';

interface StatisticsSectionProps {
  statistics: Statistics;
  user: User;
}

const StatisticsSection = ({ statistics, user }: StatisticsSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard
        title="Available Parking Lots"
        value={statistics.totalParkingLots}
        icon={MapPin}
        trend="neutral"
        trendValue="All connected"
        useIndianFormat={user.preferences?.useIndianNumberFormat}
      />
      <StatCard
        title="Total Parking Spots"
        value={statistics.totalSpots}
        icon={Car}
        trend="up"
        trendValue="+5% from last week"
        useIndianFormat={user.preferences?.useIndianNumberFormat}
      />
      <StatCard
        title="Available Spots"
        value={statistics.availableSpots}
        icon={MapPin}
        trend="down"
        trendValue="-12% from yesterday"
        useIndianFormat={user.preferences?.useIndianNumberFormat}
      />
      <StatCard
        title="Occupancy Rate"
        value={`${statistics.occupancyRate}%`}
        icon={Settings}
        trend="up"
        trendValue="+8% from average"
        useIndianFormat={user.preferences?.useIndianNumberFormat}
      />
    </div>
  );
};

export default StatisticsSection;
