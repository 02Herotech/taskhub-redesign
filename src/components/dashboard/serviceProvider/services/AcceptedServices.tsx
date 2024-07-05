"use client";
import JobCard from "../jobs/JobCard";

interface AcceptedServicesPropsType {
  acceptedBookingData: BookingType[];
}

const AcceptedServices = ({
  acceptedBookingData,
}: AcceptedServicesPropsType) => {
  return (
    <div className="flex flex-col gap-8  pb-4">
      {acceptedBookingData.map((item, index) => (
        <div key={index}>
          <JobCard
            imageUrl={item?.customer?.user?.profileImage}
            fullName={item?.customer?.user?.fullName}
            itemId={item.id}
            viewJob={true}
            title={item.bookingTitle}
            startDate={item.startDate}
            price={item.price}
          />
        </div>
      ))}
    </div>
  );
};

export default AcceptedServices;
