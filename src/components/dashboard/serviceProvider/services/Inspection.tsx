"use client";
import JobCard from "../jobs/JobCard";

interface AcceptedServicesPropsType {
  jobs: JobsType[];
  handleReportservice: (id: number) => Promise<void>;
  allBookings: BookingType[];
}

const InspectionServices = ({
  jobs,
  handleReportservice,
  allBookings,
}: AcceptedServicesPropsType) => {
  console.log(jobs.filter((job) => job.jobStatus === "INSPECTION"));
  return (
    <div className="flex flex-col gap-8  pb-4">
      {jobs
        .filter((job) => job.jobStatus === "INSPECTION")
        .map((item, index) => {
          if (!allBookings) return;

          const customer = allBookings.find(
            (booking) => booking.id === item.bookingId,
          );
          return (
            <JobCard
              key={index}
              imageUrl={customer?.customer.user.profileImage as string}
              fullName={customer?.customer.user.fullName as string}
              itemId={item.id}
              title={item.jobTitle}
              startDate={item.taskDate}
              price={item.total}
              reportJob={() => handleReportservice(item.id)}
            />
          );
        })}
    </div>
  );
};

export default InspectionServices;
