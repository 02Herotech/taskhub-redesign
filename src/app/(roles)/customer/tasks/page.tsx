"use client";

import CompletedTasks from '@/components/dashboard/customer/CompletedTasks';
import NewTasks from '@/components/dashboard/customer/NewTasks';
import OngoingTasks from '@/components/dashboard/customer/OngoingTasks';
import { useState } from 'react';

type TabName = 'New tasks' | 'Ongoing tasks' | 'Completed tasks';

const CustomerTasksPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabName>('New tasks');

  const renderContent = (): JSX.Element => {
    switch (activeTab) {
      case 'New tasks':
        return <NewTasks />;
      case 'Ongoing tasks':
        return <OngoingTasks />;
      case 'Completed tasks':
        return <CompletedTasks />;
      default:
        return <NewTasks />;
    }
  };

  return (
    <div className='p-4 lg:px-14 mt-20'>
      <div className="mt-14 mb-8 space-y-8">
        <h4 className='text-[#140B31] font-satoshiBold font-bold text-3xl lg:text-5xl'>My Tasks</h4>
        <div className='border-2 border-primary' />
      </div>
      <div className="flex items-center space-x-5">
        <button
          className={`py-5 px-10 rounded-xl text-lg font-satoshiMedium ${activeTab === 'New tasks' ? 'bg-primary text-white' : 'bg-[#EBE9F4] text-[#140B31]'}`}
          onClick={() => setActiveTab('New tasks')}
        >
          New tasks
        </button>
        <button
          className={`py-5 px-10 rounded-xl text-lg font-satoshiMedium ${activeTab === 'Ongoing tasks' ? 'bg-primary text-white' : 'bg-[#EBE9F4] text-[#140B31]'}`}
          onClick={() => setActiveTab('Ongoing tasks')}
        >
          Ongoing tasks
        </button>
        <button
          className={`py-5 px-10 rounded-xl text-lg font-satoshiMedium ${activeTab === 'Completed tasks' ? 'bg-primary text-white' : 'bg-[#EBE9F4] text-[#140B31]'}`}
          onClick={() => setActiveTab('Completed tasks')}
        >
          Completed tasks
        </button>
      </div>
      <div className="mt-10">
        {renderContent()}
      </div>
    </div>
  );
};

export default CustomerTasksPage;
