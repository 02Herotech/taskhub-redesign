// "use client";

// import { useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import CompletedTasks from '@/components/dashboard/customer/CompletedTasks';
// import NewTasks from '@/components/dashboard/customer/NewTasks';
// import OngoingTasks from '@/components/dashboard/customer/OngoingTasks';
// import AllTasks from '@/components/dashboard/customer/AllTasks';

// type TabName = 'All tasks' | 'New tasks' | 'Ongoing tasks' | 'Completed tasks';

// const CustomerTasksPage: React.FC = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const tab = searchParams.get('tab');
//   const [activeTab, setActiveTab] = useState<TabName>('New tasks');

//   useEffect(() => {
//     if (tab && (tab === 'All tasks' || tab === 'New tasks' || tab === 'Ongoing tasks' || tab === 'Completed tasks')) {
//       setActiveTab(tab as TabName);
//     }
//   }, [tab]);

//   const handleTabClick = (tabName: TabName) => {
//     setActiveTab(tabName);
//     router.push(`/customer/tasks?tab=${tabName}`)
//   };

//   const renderContent = (): JSX.Element => {
//     switch (activeTab) {
//       case 'All tasks':
//         return <AllTasks />;
//       case 'New tasks':
//         return <NewTasks />;
//       case 'Ongoing tasks':
//         return <OngoingTasks />;
//       case 'Completed tasks':
//         return <CompletedTasks />;
//       default:
//         return <NewTasks />;
//     }
//   };

//   return (
//     <div className='p-4 lg:px-14 mt-[4rem]'>
//       {/* <div className="mt-14 mb-8 space-y-8">
//         <h4 className='text-[#140B31] font-satoshiBold font-bold text-2xl lg:text-4xl'>My Tasks</h4>
//         <div className='border-[1.5px] border-primary' />
//       </div> */}
//       <div className="hidden lg:flex items-center space-x-5 mt-10 lg:mt-14">
//         <button
//           className={`py-3 px-5 rounded-xl text-sm lg:text-base font-satoshiMedium ${activeTab === 'New tasks' ? 'bg-primary text-white' : 'bg-[#EBE9F4] text-[#140B31]'}`}
//           onClick={() => handleTabClick('All tasks')}
//         >
//           All tasks
//         </button>
//         <button
//           className={`py-3 px-5 rounded-xl text-sm lg:text-base font-satoshiMedium ${activeTab === 'New tasks' ? 'bg-primary text-white' : 'bg-[#EBE9F4] text-[#140B31]'}`}
//           onClick={() => handleTabClick('New tasks')}
//         >
//           New tasks
//         </button>
//         <button
//           className={`py-3 px-5 rounded-xl text-sm lg:text-base font-satoshiMedium ${activeTab === 'Ongoing tasks' ? 'bg-primary text-white' : 'bg-[#EBE9F4] text-[#140B31]'}`}
//           onClick={() => handleTabClick('Ongoing tasks')}
//         >
//           Ongoing tasks
//         </button>
//         <button
//           className={`py-3 px-5 rounded-xl text-sm lg:text-base font-satoshiMedium ${activeTab === 'Completed tasks' ? 'bg-primary text-white' : 'bg-[#EBE9F4] text-[#140B31]'}`}
//           onClick={() => handleTabClick('Completed tasks')}
//         >
//           Completed tasks
//         </button>
//       </div>

//       <div className="lg:hidden flex items-center space-x-5 mt-10 lg:mt-14">
//         <button
//           className={`py-3 px-5 rounded-xl text-sm lg:text-base font-satoshiMedium ${activeTab === 'New tasks' ? 'bg-primary text-white' : 'bg-[#EBE9F4] text-[#140B31]'}`}
//           onClick={() => handleTabClick('All tasks')}
//         >
//           All
//         </button>
//         <button
//           className={`py-3 px-5 rounded-xl text-sm lg:text-base font-satoshiMedium ${activeTab === 'New tasks' ? 'bg-primary text-white' : 'bg-[#EBE9F4] text-[#140B31]'}`}
//           onClick={() => handleTabClick('New tasks')}
//         >
//           New
//         </button>
//         <button
//           className={`py-3 px-5 rounded-xl text-sm lg:text-base font-satoshiMedium ${activeTab === 'Ongoing tasks' ? 'bg-primary text-white' : 'bg-[#EBE9F4] text-[#140B31]'}`}
//           onClick={() => handleTabClick('Ongoing tasks')}
//         >
//           Ongoing
//         </button>
//         <button
//           className={`py-3 px-5 rounded-xl text-sm lg:text-base font-satoshiMedium ${activeTab === 'Completed tasks' ? 'bg-primary text-white' : 'bg-[#EBE9F4] text-[#140B31]'}`}
//           onClick={() => handleTabClick('Completed tasks')}
//         >
//           Completed
//         </button>
//       </div>
      
//       <div className="mt-10">
//         {renderContent()}
//       </div>
//     </div>
//   );
// };

// export default CustomerTasksPage;

"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CompletedTasks from '@/components/dashboard/customer/CompletedTasks';
import NewTasks from '@/components/dashboard/customer/NewTasks';
import OngoingTasks from '@/components/dashboard/customer/OngoingTasks';
import AllTasks from '@/components/dashboard/customer/AllTasks';

type TabName = 'All tasks' | 'New tasks' | 'Ongoing tasks' | 'Completed tasks';

const CustomerTasksPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<TabName>('All tasks');

  useEffect(() => {
    // if (tab && (tab === 'New tasks' || tab === 'Ongoing tasks' || tab === 'Completed tasks')) {
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
    <div className='p-1 lg:px-14'>
    {/* <div className="w-full px-0 sm:px-4 lg:px-14 mt-[4rem] mb-[6rem] mx-auto"> */}
      <div className="hidden lg:flex items-center space-x-5 mt-12 lg:mt-16">
        {(['All tasks', 'New tasks', 'Ongoing tasks', 'Completed tasks'] as TabName[]).map((tabName) => (
          <button
            key={tabName}
            className={`py-3 px-5 rounded-xl text-sm lg:text-base font-satoshiMedium ${
              activeTab === tabName ? 'bg-primary text-white' : 'bg-[#EBE9F4] text-[#140B31]'
            }`}
            onClick={() => handleTabClick(tabName)}
          >
            {tabName}
          </button>
        ))}
      </div>

      {/* <div className="lg:hidden flex items-center space-x-5 mt-10 lg:mt-14"> */}
      <div className="lg:hidden flex w-full justify-between mt-10">
        {(['All tasks', 'New tasks', 'Ongoing tasks', 'Completed tasks'] as TabName[]).map((tabName, index) => (
          <button
            key={index}
            className={`py-3 px-5 rounded-xl text-sm lg:text-base font-satoshiMedium ${
              activeTab === tabName ? 'bg-primary text-white' : 'bg-[#EBE9F4] text-[#140B31]'
            }`}
            onClick={() => handleTabClick(tabName)}
          >
            {tabName.split(' ')[0]} {/* Shortened for mobile */}
          </button>
        ))}
      </div>

      <div className="mt-10 pb-5">{renderContent()}</div>
    </div>
  );
};

export default CustomerTasksPage;
