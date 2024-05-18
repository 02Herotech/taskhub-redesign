import Image from "next/image";

import loader from "../../public/assets/images/marketplace/taskhub-newloader.gif"

const Loading = () => {
    return (

        <div className="w-full flex items-center justify-center h-[300px] ">
            <Image src={loader} alt="loader" width={80} height={80} />
        </div>

    );
}

export default Loading;