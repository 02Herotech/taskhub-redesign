

"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CompletedTasks from '@/components/dashboard/customer/CompletedTasks';
import NewTasks from '@/components/dashboard/customer/taskmodule/NewTasks';
import OngoingTasks from '@/components/dashboard/customer/taskmodule/OngoingTasks';
import AllTasks from '@/components/dashboard/customer/taskmodule/AllTasks';
import { MdArrowBackIos } from 'react-icons/md';

type TabName = 'All tasks' | 'New tasks' | 'Ongoing tasks' | 'Completed tasks';

const CustomerTasksPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<TabName>('All tasks');

  useEffect(() => {
    if (tab && (tab === 'All tasks' || tab === 'New tasks' || tab === 'Ongoing tasks' || tab === 'Completed tasks')) {
      setActiveTab(tab as TabName);
    }
  }, [tab]);

  const handleTabClick = (tabName: TabName) => {
    setActiveTab(tabName);
    router.push(`/customer/tasks?tab=${tabName}`);
  };

  const renderContent = (): JSX.Element => {
    switch (activeTab) {
      case 'All tasks':
        return <AllTasks />;
      case 'New tasks':
        return <NewTasks />;
      case 'Ongoing tasks':
        return <OngoingTasks />;
      case 'Completed tasks':
        return <CompletedTasks />;
      default:
        return <AllTasks />;
    }
  };

  return (
    <div className='pt-10'>
      <h1 className="text-2xl font-bold ">My Tasks</h1>
      <div className="flex items-center mb-3 gap-1">
        <button className="flex items-center text-gray-600 hover:text-gray-900">
          <MdArrowBackIos />
          Back
        </button>
        |
        <span className="cursor-pointer text-[#55535A]" onClick={() => handleTabClick(tab as TabName)}>My Tasks</span>/
        {tab && <span className="cursor-pointer text-[#55535A]" onClick={() => handleTabClick(tab as TabName)}>{tab}</span>}
      </div>

      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-1 min-w-max border-b border-gray-200">
          {(['All tasks', 'New tasks', 'Ongoing tasks', 'Completed tasks'] as TabName[]).map((tabName) => (
            <button
              key={tabName}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === tabName
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700 hover:border-b hover:border-gray-300"
                }`}
              onClick={() => handleTabClick(tabName)}
            >
              {tabName}
            </button>
          ))}
        </div>
      </div>

      {/* <div className="lg:hidden flex items-center space-x-5 mt-10 lg:mt-14"> */}
      {/* <div className="lg:hidden flex w-full justify-between mt-10">
        {(['All tasks', 'New tasks', 'Ongoing tasks', 'Completed tasks'] as TabName[]).map((tabName, index) => (
          <button
            key={index}
            className={`py-3 px-5 rounded-xl text-sm lg:text-base font-satoshiMedium ${
              activeTab === tabName ? 'bg-primary text-white' : 'bg-[#EBE9F4] text-[#140B31]'
            }`}
            onClick={() => handleTabClick(tabName)}
          >
            {tabName.split(' ')[0]}
          </button>
        ))}
      </div> */}

      <div className="mt-10 pb-5">{renderContent()}</div>
    </div>
  );
};

export default CustomerTasksPage;
