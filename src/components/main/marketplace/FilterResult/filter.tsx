import Image from "next/image"



interface FiterProps {
    isLoading: any
    filterData: any
}

const Filter = ({ isLoading, filterData }: FiterProps) => {
    return (
        <div>
            {
                isLoading ?
                    <div className="w-full flex items-center justify-center h-[300px] ">
                        <Image src="/public/assets/images/customer/task/Task management.svg" alt="loader" width={80} height={80} />
                    </div>
                    :
                    {
                        filterData.map((listing: any, index: any) => (
                            <div key={listing.id} className=" w-full">
                                <div className="grid grid-col-4 gap-x-4 w-[250px] h-[280px] ">
                                    <div className="bg-[#EBE9F4]  flex flex-col p-3 rounded-2xl">
                                        {listing.businessPictures.length > 1 && (
                                            <img
                                                src={listing.businessPictures[0]}
                                                alt=""
                                                width={230}
                                                className="rounded-xl border-[1.5px] border-[#D9D9D9] h-[150px]"
                                            />
                                        )}
                                        <div className="mt-2 flex flex-col justify-between h-full">
                                            <h2 className="text-[18px] font-bold">{listing.businessName}</h2>

                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center space-x-2 ">
                                                    <div className="flex">
                                                        {profileImages ? (
                                                            <div>
                                                                {profileImages[listing.posterId] ? (
                                                                    <img
                                                                        src={profileImages[listing.posterId]}
                                                                        alt={`Profile of ${listing.posterId}`}
                                                                        width={25}
                                                                        className="h-[25px] rounded-[50%] "
                                                                    />
                                                                ) : (
                                                                    <div className="bg-grey3 text-white p-2 rounded-[50%] ">
                                                                        <FaRegUser size={10} />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <p className="text-[12px]">{imgErrMsg}</p>
                                                        )}
                                                    </div>

                                                    <p className="text-[12px]">{firstName[listing.posterId]} {lastName[listing.posterId]}</p>
                                                </div>
                                                <p className="text-[14px] text-[#381F8C] font-bold">From ${listing.pricing} </p>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    </div>
        
        }
        </div >
    );
}

export default Filter;