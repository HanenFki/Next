'use client'
import React from 'react';
import AreaChartPlot from '../admin/areaChartPlot';
import AreaUsersList from '../admin/areaUsersList';
const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: -1000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 500, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: -2000, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: -250, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const CardsAnalytics = () => {
  return (
    <div className="container mx-auto p-6">
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Financial Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-[#ff9747] rounded-lg p-6 flex flex-col justify-center items-center">
            <p className="text-white text-lg font-semibold mb-2">Total Returns</p>
            <p className="text-black text-3xl font-bold mb-2">50,000 TND</p>
            <p className="text-green-300">+24.5%</p>
          </div>
          <div className="bg-[#ff9747] rounded-lg p-6 flex flex-col justify-center items-center">
            <p className="text-white text-lg font-semibold mb-2">Total Sales</p>
            <p className="text-black text-3xl font-bold mb-2">30,000 TND</p>
            <p className="text-green-300">+34.5%</p>
          </div>
          <div className="bg-[#ff9747] rounded-lg p-6 flex flex-col justify-center items-center">
            <p className="text-white text-lg font-semibold mb-2">Total Subscriptions</p>
            <p className="text-black text-3xl font-bold mb-2">20,000 TND</p>
            <p className="text-green-300">+24.5%</p>
          </div>
          <div className="bg-[#ff9747] rounded-lg p-6 flex flex-col justify-center items-center">
            <p className="text-white text-lg font-semibold mb-2">Total Orders</p>
            <p className="text-black text-3xl font-bold mb-2">60,000 TND</p>
            <p className="text-red-300">-14.5%</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Sales Trends</h2>
        <div className="bg-[#ff9747] rounded-lg p-6">
          <AreaChartPlot  data={data}/>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">User Activity</h2>
        <div className="bg-[#ff9747] rounded-lg p-6">
          <AreaUsersList />
        </div>
      </section>
    </div>
  );
};

export default CardsAnalytics;
