"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CompletedTasks from '@/components/dashboard/customer/CompletedTasks';
import NewTasks from '@/components/dashboard/customer/NewTasks';
import OngoingTasks from '@/components/dashboard/customer/OngoingTasks';

type TabName = 'New tasks' | 'Ongoing tasks' | 'Completed tasks';

const CustomerTasksPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<TabName>('New tasks');

  useEffect(() => {
    if (tab && (tab === 'New tasks' || tab === 'Ongoing tasks' || tab === 'Completed tasks')) {
      setActiveTab(tab as TabName);
    }
  }, [tab]);

  const handleTabClick = (tabName: TabName) => {
    setActiveTab(tabName);
    router.push(`/customer/tasks?tab=${tabName}`)
  };

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
          className={`py-3 px-5 lg:py-5 lg:px-10 rounded-xl text-base lg:text-lg font-satoshiMedium ${activeTab === 'New tasks' ? 'bg-primary text-white' : 'bg-[#EBE9F4] text-[#140B31]'}`}
          onClick={() => handleTabClick('New tasks')}
        >
          New tasks
        </button>
        <button
          className={`py-3 px-5 lg:py-5 lg:px-10 rounded-xl text-base lg:text-lg font-satoshiMedium ${activeTab === 'Ongoing tasks' ? 'bg-primary text-white' : 'bg-[#EBE9F4] text-[#140B31]'}`}
          onClick={() => handleTabClick('Ongoing tasks')}
        >
          Ongoing tasks
        </button>
        <button
          className={`py-3 px-5 lg:py-5 lg:px-10 rounded-xl text-base lg:text-lg font-satoshiMedium ${activeTab === 'Completed tasks' ? 'bg-primary text-white' : 'bg-[#EBE9F4] text-[#140B31]'}`}
          onClick={() => handleTabClick('Completed tasks')}
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
