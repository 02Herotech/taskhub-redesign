import Link from "next/link";
import { FaRegUser } from "react-icons/fa";

interface ListingProps {
    data: any
    profileImages: any
    imgErrMsg: any
    firstName: any
    lastName: any

}

const Listing = ({ data, profileImages, imgErrMsg, firstName, lastName }: ListingProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4 lg:gap-2  my-2 ">
            {
                data.map((listing: any, index: any) => (
                    <Link href={`/marketplace/${listing.id}`} key={listing.id}>
                        <div className=" w-full flex justify-center my-3">
                            <div className="w-[320px] md:w-[250px] md:h-[300px] h-[350px] bg-[#EBE9F4]  flex flex-col p-3 rounded-2xl">
                                <div className=" h-[230px] w-[295px] md:w-[225px] md:h-[150px] ">
                                    {listing.businessPictures.length > 1 && (
                                        <img
                                            src={listing.businessPictures[0]}
                                            alt=""
                                            className="h-full w-full object-cover rounded-xl border-[1.5px] border-[#D9D9D9]"
                                        />
                                    )}
                                </div>
                                <div className="mt-2 flex flex-col justify-between h-full">
                                    <h2 className="text-[20px] md:text-[23px]  font-bold">{listing.businessName}</h2>

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
                                                            <div className="bg-[#b4b2be] text-white p-[9px] rounded-[50%] ">
                                                                <FaRegUser size={10} />
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <p className="text-[12px]">{imgErrMsg}</p>
                                                )}
                                            </div>

                                            <p className="text-[16px] font-[500]">{firstName[listing.posterId]} {lastName[listing.posterId]}</p>
                                        </div>
                                        <p className="text-[16px] text-[#381F8C] font-[600]">From ${listing.pricing} </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    );
}

export default Listing;