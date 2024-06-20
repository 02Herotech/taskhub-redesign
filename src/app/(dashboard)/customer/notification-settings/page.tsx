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
]

const NotificationsSettingsPage = () => {
    return (
        <div className="p-4 lg:px-14 mt-[4rem]">
            <div className="mt-14 mb-4 space-y-8">
                <h4 className='text-[#140B31] font-satoshiBold font-bold text-2xl lg:text-4xl'>Notification settings</h4>
                <div className='border-2 border-primary' />
            </div>
            <div className="py-3 px-6 lg:py-4 lg:px-8 bg-[#EBE9F4] rounded-2xl flex items-center justify-between">
                <div className="space-y-3">
                    <h3 className="text-[#140B31] font-satoshiBold font-bold text-xl lg:text-2xl">Control how we notify you</h3>
                    <h5 className="text-black lg:text-lg font-satoshiMedium">Notify me</h5>
                </div>
                <div className="bg-white p-3 rounded-xl flex items-center justify-center">
                    <IoIosNotificationsOutline className="size-5 lg:size-8" />
                </div>
            </div>
            <div className="py-3 px-6 lg:py-4 lg:px-8 mt-5 bg-[#EBE9F4] rounded-2xl">
                {NotificationOptions.map((option, index) => (
                    <div key={index} className="flex items-center justify-between space-x-5 lg:space-x-8 mb-5">
                        <h5 className="text-black text-sm lg:text-lg font-satoshiMedium">{option}</h5>
                        <input type="checkbox" className="w-4 h-4 lg:w-5 lg:h-5" />
                    </div>
                ))}
                <div className="flex items-center justify-center lg:justify-end mt-6">
                    <Button className="rounded-full lg:w-48">
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default NotificationsSettingsPage