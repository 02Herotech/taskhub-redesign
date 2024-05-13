import { toast, ToastOptions } from "react-toastify";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

interface CustomToastOptions extends ToastOptions<{}> {
    toastStyle?: React.CSSProperties;
}

class Toast {
    success(message: string = "") {
        const toastStyle: React.CSSProperties = {
            backgroundColor: "#EBE9F4",
        };

        toast.success(message, {
            icon: (
                <div className="w-6 h-6">
                    <IoCheckmarkCircleSharp className="text-primary" />
                </div>
            ),
            bodyStyle: toastStyle,
        } as CustomToastOptions);
    }
    // error(message: string = "") {
    //     toast.error(message, {
    //         icon: (
    //             <div className='w-6 h-6'>
    //                 <Icons.ErrorIcon />
    //             </div>
    //         ),
    //     });
    // }
    // info(message: string = "") {
    //     toast.info(message, {
    //         icon: (
    //             <div className='w-6 h-6'>
    //                 <Icons.InfoIcon />
    //             </div>
    //         ),
    //     });
    // }
    // warning(message: string = "") {
    //     toast.warning(message, {
    //         icon: (
    //             <div className='w-6 h-6'>
    //                 <Icons.WarningIcon />
    //             </div>
    //         ),
    //     });
    // }
}

const taskhubToast = new Toast();

export { taskhubToast };
