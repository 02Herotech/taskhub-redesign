import Link from "next/link";
import { FaRegUser } from "react-icons/fa";

interface ListingProps {
  data: any;
  profileImages: any;
  imgErrMsg: any;
  firstName: any;
  lastName: any;
}

const Listing = ({
  data,
  profileImages,
  imgErrMsg,
  firstName,
  lastName,
}: ListingProps) => {
  return (
    <div className="my-2 grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2 lg:grid-cols-4  lg:gap-2 ">
      {data.map((listing: any, index: any) => (
        <Link href={`/marketplace/${listing.id}`} key={listing.id}>
          <div className=" my-3 flex w-full justify-center">
            <div className="flex h-[350px] w-[320px] flex-col rounded-2xl  bg-[#EBE9F4] p-3 md:h-[300px] md:w-[250px]">
              <div className=" h-[230px] w-[295px] md:h-[150px] md:w-[225px] ">
                {listing.businessPictures.length > 1 && (
                  <img
                    src={listing.businessPictures[0]}
                    alt=""
                    className="h-full w-full rounded-xl border-[1.5px] border-[#D9D9D9] object-cover"
                  />
                )}
              </div>
              <div className="mt-2 flex h-full flex-col justify-between">
                <h2 className="text-[20px] font-bold  md:text-[23px]">
                  {listing.businessName}
                </h2>

                <div className="flex items-center justify-between">
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
                            <div className="rounded-[50%] bg-[#b4b2be] p-[9px] text-white ">
                              <FaRegUser size={10} />
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-[12px]">{imgErrMsg}</p>
                      )}
                    </div>

                    <p className="text-[16px] font-[500]">
                      {firstName[listing.posterId]} {lastName[listing.posterId]}
                    </p>
                  </div>
                  <p className="text-[16px] font-[600] text-[#381F8C]">
                    From ${listing.pricing}{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Listing;
