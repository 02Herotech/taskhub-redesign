"use client";

import React from "react";
import CompletedTasksCard, { CompletedTasksProps } from "../CompletedTasksCard";
import { FiAlertTriangle } from "react-icons/fi";

const sampleTasks: CompletedTasksProps[] = [
    {
        taskTitle: 'Grocery Shopping',
        location: '123 Main St, Springfield',
        time: new Date('2024-06-01T09:00:00'),
        price: 25.50,
        complete: false
    },
    {
        taskTitle: 'Dog Walking',
        location: '456 Elm St, Shelbyville',
        time: new Date('2024-06-01T10:00:00'),
        price: 15.00,
        complete: false
    },
    {
        taskTitle: 'House Cleaning',
        location: '789 Oak St, Ogdenville',
        time: new Date('2024-06-02T13:00:00'),
        price: 50.00,
        complete: false
    },
    {
        taskTitle: 'Gardening',
        location: '101 Pine St, Capital City',
        time: new Date('2024-06-03T08:00:00'),
        price: 30.00,
        complete: true
    },
    {
        taskTitle: 'Babysitting',
        location: '202 Maple St, North Haverbrook',
        time: new Date('2024-06-03T18:00:00'),
        price: 40.00,
        complete: true
    },
];

const TaskList: React.FC = () => {
    return (
        <div className="font-satoshi">
            <div className="bg-tc-orange text-white p-5 rounded-3xl flex space-x-4 mb-7">
                <FiAlertTriangle className="h-8 w-8" />
                <p className="lg:text-lg">Once a task is finished, you have one or two days to approve or request a revision. If no action is taken within this timeframe, we will automatically mark it as completed.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {sampleTasks.map((task, index) => (
                    <CompletedTasksCard key={index} task={task} />
                ))}
            </div>
        </div>
    );
};

export default TaskList;
