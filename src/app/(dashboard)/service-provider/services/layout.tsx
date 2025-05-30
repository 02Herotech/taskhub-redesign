"use client"
import { Suspense } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";



export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const tab = pathname.split("/")[3]
  const title = searchParams.get("title")


  const handleTabClick = (tab: string) => {
    router.push(tab)
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(e.target.value);
  };


  const TabItems = [
    {
      label: "All Services",
      path: "/service-provider/services/all-services",
    },
    {
      label: "Posted by Me",
      path: "/service-provider/services/posted-by-me",
    },
    // {
    //   label: "Booking Requests",
    //   path: "/service-provider/services/booking-requests",
    // },
    {
      label: "My Offers",
      path: "/service-provider/services/my-offers",
    },
    {
      label: "Assigned",
      path: "/service-provider/services/assigned-task",
    },
    {
      label: "Ongoing",
      path: "/service-provider/services/ongoing",
    },
    {
      label: "Completed",
      path: "/service-provider/services/completed",
    },
  ];

  const tabLabel = TabItems.find((tabitem) => tabitem.path.split("/").at(-1) === tab)

  return (
    <main className=" pt-8">
      <h1 className="text-2xl font-bold my-2 text-[#2A1769] font-manrope  ">My Service</h1>
      <div className="hidden sm:flex items-center mb-3 gap-2">
        <button onClick={() => router.back()} className="flex items-center text-gray-600 hover:text-gray-900">
          <MdArrowBackIos />
          Back
        </button>
        |
        <span className="cursor-pointer text-[#55535A]" onClick={() => router.push("/service-provider/service/all-services")}>My Services</span>/

        {tab && <span className="cursor-pointer text-[#55535A]" onClick={() => handleTabClick(`/service-provider/services/${tab}`)}>{tab}</span>}

        {title && <span className="cursor-pointer text-[#55535A] capitalize w-20 truncate md:w-64"> {"/  "}{title}</span>}
      </div>

      <div className="mb-6 overflow-x-auto font-manrope hidden sm:block">
        <div className="flex space-x-1 min-w-max border-b border-gray-200">
          {(TabItems).map((tabName) => {

            const activeTab = pathname.split("/").includes(tabName.path.split("/").at(-1))
            return (
              <Link
                href={tabName.path}
                key={tabName.label}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab
                  ? "text-primary border-b-2 border-[#FE9B07]"
                  : "text-gray-500 hover:text-gray-700 hover:border-b hover:border-gray-300"
                  }`}
              >
                {tabName.label}
              </Link>
            )
          })}
        </div>
      </div>


      <div className="bg-[#EBE9F4] rounded-md px-4 sm:hidden font-manrope mt-2 mb-4">
        <select onChange={handleChange} className="px-4 py-2 text-primary text-sm font-medium bg-[#EBE9F4] border-none outline-none w-full">
          {TabItems.map((tab) => (
            <option className="text-primary" key={tab.label} value={tab.path}>
              {tab.label}
            </option>
          ))}
        </select>

      </div>
      <Suspense>{children}</Suspense>
    </main>
  );
};
