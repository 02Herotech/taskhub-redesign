import { myservices } from "@/app/(dashboard)/service-provider/services/page";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { motion } from "framer-motion";
import axios from "axios";
import { useSession } from "next-auth/react";
import Loading from "@/shared/loading";
import { marketPlaceModalIcon } from "@/lib/svgIcons";
import { BsPencilSquare } from "react-icons/bs";

const AllServices = () => {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [servicesData, setservicesData] = useState<ListingDataType[]>([]);

  const session = useSession();
  const token = session?.data?.user?.accessToken;
  const user = session?.data?.user?.user;

  const fetchAllServices = async () => {
    try {
      setLoading(true);
      if (!token) {
        throw new Error("Authorization token is missing");
      }
      const url =
        "https://smp.jacinthsolutions.com.au/api/v1/listing/service-provider/0";
      const response = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = response.data;
      if (!data.content) {
        throw new Error("Response content is missing");
      }
      console.log(data);
      setservicesData(data.content);
    } catch (error) {
      console.error("An error occurred while fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllServices();
    // eslint-disable-next-line
  }, [token]);

  return (
    <>
      {loading ? (
        <div className="flex min-h-80 items-center justify-center">
          <Loading />
        </div>
      ) : (
        <section className="flex flex-wrap gap-4">
          {servicesData.length === 0 ? (
            <div className="flex min-h-96 w-full flex-col items-center justify-center gap-4 p-4 ">
              <span className="size-64">{marketPlaceModalIcon}</span>
              <p className="text-xl font-medium text-violet-normal">
                No active Listing
              </p>
              <button className="rounded-full bg-violet-normal px-6 py-2 text-white transition-all hover:opacity-90">
                Provide Service
              </button>
            </div>
          ) : (
            servicesData.map((item, index) => (
              <motion.div
                key={index}
                className=" group cursor-pointer space-y-8 rounded-xl bg-[#EBE9F4] p-2 transition-all duration-300 "
                // onClick={() => handleNavigateCard(index)}
                initial={{ opacity: 0, translateY: "5rem" }}
                whileInView={{ opacity: 1, translateY: "0" }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-2">
                  <div className="relative h-52  w-72 overflow-hidden rounded-xl">
                    <Image
                      src={
                        item.businessPictures[0] ??
                        "/assets/images/serviceProvider/drain.png"
                      }
                      width={400}
                      height={400}
                      alt={item.listingTitle}
                      className=" h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 "
                    />
                    <span className="absolute right-3 top-3 flex items-center gap-2 rounded-full border bg-orange-normal  px-2 py-1 text-sm text-white  ">
                      <BsPencilSquare className="" />
                      Edit
                    </span>
                  </div>
                  <p className="px-2 text-3xl font-bold text-[#190E3F] ">
                    {item.listingTitle}
                  </p>

                  <div className="px-2">
                    <p className="text-xs"> 4.5 </p>
                    <div className="flex items-center gap-1">
                      <FaStar size={10} color="gold" />
                      <FaStar size={10} color="gold" />
                      <FaStar size={10} color="gold" />
                      <FaStar size={10} color="gold" />
                      <FaStar size={10} color="grey" />
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 py-3">
                        <Image
                          src={
                            user?.profileImage ??
                            "/assets/images/serviceProvider/user.jpg"
                          }
                          alt={user?.firstName ?? "user"}
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                        <p className="text-xs">
                          {user?.firstName} {user?.lastName}
                        </p>
                      </div>
                      <p className="font-bold text-[#381F8C] ">
                        From ${item.planOnePrice}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </section>
      )}
    </>
  );
};

export default AllServices;
