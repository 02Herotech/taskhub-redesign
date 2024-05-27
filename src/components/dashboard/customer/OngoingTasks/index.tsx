import OngoingTasksCard from "../OngoingTasksCard";

type OngoingTasksProps = {
    taskTitle: string;
    serviceProvider: string;
    serviceProviderImage: string;
    location: string;
    time: Date;
    price: number;
};

const sampleTasks: OngoingTasksProps[] = [
    {
        taskTitle: "House Cleaning",
        serviceProvider: "Sparkle Cleaners",
        serviceProviderImage: "https://example.com/images/sparkle-cleaners.jpg",
        location: "123 Main St, Springfield",
        time: new Date(2024, 4, 28, 14, 30), // May 28, 2024, 2:30 PM
        price: 120.00
    },
    {
        taskTitle: "Dog Walking",
        serviceProvider: "Happy Paws",
        serviceProviderImage: "https://example.com/images/happy-paws.jpg",
        location: "456 Elm St, Springfield",
        time: new Date(2024, 4, 29, 9, 0), // May 29, 2024, 9:00 AM
        price: 30.00
    },
    {
        taskTitle: "Gardening Service",
        serviceProvider: "Green Thumb",
        serviceProviderImage: "https://example.com/images/green-thumb.jpg",
        location: "789 Oak St, Springfield",
        time: new Date(2024, 4, 30, 11, 15), // May 30, 2024, 11:15 AM
        price: 75.00
    },
    {
        taskTitle: "Personal Training",
        serviceProvider: "FitLife",
        serviceProviderImage: "https://example.com/images/fitlife.jpg",
        location: "101 Maple St, Springfield",
        time: new Date(2024, 5, 1, 17, 0), // June 1, 2024, 5:00 PM
        price: 50.00
    },
    {
        taskTitle: "Car Wash",
        serviceProvider: "Shiny Rides",
        serviceProviderImage: "https://example.com/images/shiny-rides.jpg",
        location: "202 Birch St, Springfield",
        time: new Date(2024, 5, 2, 13, 45), // June 2, 2024, 1:45 PM
        price: 25.00
    }
];

const OngoingTasks = () => {
  return (
      <div className="grid grid-cols-1 gap-5">
          {sampleTasks.map((task, index) => (
              <OngoingTasksCard key={index} task={task} />
          ))}
      </div>
  )
}

export default OngoingTasks