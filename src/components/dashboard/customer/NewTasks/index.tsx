"use client";

import React from "react";
import NewTasksCard, { NewTaskProps } from "../NewTasksCard";

const sampleTasks: NewTaskProps[] = [
  {
    taskTitle: 'Grocery Shopping',
    location: '123 Main St, Springfield',
    time: new Date('2024-06-01T09:00:00'),
    price: 25.50,
  },
  {
    taskTitle: 'Dog Walking',
    location: '456 Elm St, Shelbyville',
    time: new Date('2024-06-01T10:00:00'),
    price: 15.00,
  },
  {
    taskTitle: 'House Cleaning',
    location: '789 Oak St, Ogdenville',
    time: new Date('2024-06-02T13:00:00'),
    price: 50.00,
  },
  {
    taskTitle: 'Gardening',
    location: '101 Pine St, Capital City',
    time: new Date('2024-06-03T08:00:00'),
    price: 30.00,
  },
  {
    taskTitle: 'Babysitting',
    location: '202 Maple St, North Haverbrook',
    time: new Date('2024-06-03T18:00:00'),
    price: 40.00,
  },
];

const TaskList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {sampleTasks.map((task, index) => (
        <NewTasksCard key={index} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
