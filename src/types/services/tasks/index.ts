
export type Task = {
    id: number;
    posterId: number;
    taskServiceName: string;
    category: string;
    subCategory: string;
    taskDescription: string;
    userAddress: string;
    postedAt: Date;
    customerBudget: number;
    taskImage: string;
    taskDates: Date[];
    active: boolean;
}

export type GetTasksRequest = {
    pageNumber?: number;
};

export type GetTasksResponse = {
    totalElements: number;
    totalPages: number;
    pageNumber: number;
    pageSize: string;
    content: Task[];
};
