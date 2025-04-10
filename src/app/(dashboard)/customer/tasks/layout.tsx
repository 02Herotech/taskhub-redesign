"use client"
import { Suspense } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function TaskLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()
  const router = useRouter()

  const tab = pathname.split("/")[3]


  const handleTabClick = (tab: string) => {
    router.push(tab)
  }

  const TabItems = [
    {
      label: "All Tasks",
      path: "/customer/tasks/all-tasks",
    },
    {
      label: "Posted by Me",
      path: "/customer/tasks/posted-by-me",
    },
    {
      label: "Ongoing Tasks",
      path: "/customer/tasks/ongoing-tasks",
    },
    {
      label: "Completed Tasks",
      path: "/customer/tasks/completed-tasks",
    },
  ];

  const tabLabel = TabItems.find((tabitem) => tabitem.path.split("/").at(-1) === tab)

  return (
    <main className=" pt-8">
      <h1 className="text-2xl font-bold ">My Tasks</h1>
      <div className="flex items-center mb-3 gap-1">
        <button className="flex items-center text-gray-600 hover:text-gray-900">
          <MdArrowBackIos />
          Back
        </button>
        |
        <span className="cursor-pointer text-[#55535A]" onClick={() => handleTabClick(tab)}>My Tasks</span>/
        {tab && <span className="cursor-pointer text-[#55535A]" onClick={() => handleTabClick(tab)}>{tab}</span>}
      </div>

      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-1 min-w-max border-b border-gray-200">
          {(TabItems).map((tabName) => {

            const activeTab = pathname === tabName.path
            return (
              <Link
                href={tabName.path}
                key={tabName.label}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-b hover:border-gray-300"
                  }`}
              // onClick={() => handleTabClick(tabName.path)}
              >
                {tabName.label}
              </Link>
            )
          })}
        </div>
      </div>
      <Suspense>{children}</Suspense>
    </main>
  );
};
