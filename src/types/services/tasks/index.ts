
export type Task = {
    id: number;
    posterId: number;
    taskServiceName: string;
    category: string;
    subCategory: string;
    taskDescription: string;
    userAddress: string;
    postedAt: any;
    customerBudget: number;
    taskImage: string;
    taskDates: any;
    active: boolean;
}

export type GetTasksRequest =  number;

export type GetTasksResponse = {
    totalElements: number;
    totalPages: number;
    pageNumber: number;
    pageSize: string;
    content: Task[];
};

export type GetSingleTasksResponse = Task;
