import Button from "@/components/global/Button";
import { IoIosNotificationsOutline } from "react-icons/io";

const NotificationOptions = [
  "When someone replies my Tasks and Messages",
  "When someone send me an offer",
  "When a task/service is posted that matches your preferences",
  "When someone accepts my offer",
  "When someone rates me",
  "About task/service matches my search criteria and my activity on TaskHub",
  "There are new and exciting updates on TaskHub",
];

const NotificationsSettings = () => {
  return (
    <div className="mt-10 p-4 lg:mt-20 lg:px-14">
      {/* <div className="mt-14 mb-4 space-y-8">
                <h4 className='text-[#140B31] font-satoshiBold font-bold text-2xl lg:text-4xl'>Notification settings</h4>
                <div className='border-2 border-primary' />
            </div> */}
      <div className="flex items-center justify-between rounded-2xl bg-[#EBE9F4] px-6 py-3 lg:px-8 lg:py-4">
        <div className="space-y-3">
          <h3 className="font-satoshiBold text-xl font-bold text-[#140B31] lg:text-2xl">
            Control how we notify you
          </h3>
          <h5 className="font-satoshiMedium text-black lg:text-lg">
            Notify me
          </h5>
        </div>
        <div className="flex items-center justify-center rounded-xl bg-white p-3">
          <IoIosNotificationsOutline className="size-5 lg:size-8" />
        </div>
      </div>
      <div className="mt-5 rounded-2xl bg-[#EBE9F4] px-6 py-3 lg:px-8 lg:py-4">
        {NotificationOptions.map((option, index) => (
          <div
            key={index}
            className="mb-5 flex items-center justify-between space-x-5 lg:space-x-8"
          >
            <h5 className="font-satoshiMedium text-sm text-black lg:text-lg">
              {option}
            </h5>
            <input
              type="checkbox"
              className="h-4 w-4 cursor-pointer lg:h-5 lg:w-5"
            />
          </div>
        ))}
        <div className="mt-6 flex items-center justify-center lg:justify-end">
          <Button className="rounded-full lg:w-48">Save</Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSettings;
