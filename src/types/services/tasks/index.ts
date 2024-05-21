
export type Task = {
    id: number;
    posterId: number;
    taskDescription: string;
    taskImage: string;
    taskTime: string;
    taskDate: [number, number, number];
    hubTime: string;
    taskType: string;
    taskAddress: string;
    createdAt: [number, number, number];
    customerBudget: number;
    active: boolean;
};

export type GetTasksRequest =  number;

export type GetTasksResponse = {
    totalElements: number;
    totalPages: number;
    pageNumber: number;
    pageSize: string;
    content: Task[];
};

export type GetSingleTasksResponse = Task;

export type GetFilterTaskByPriceRequest = {
    page: number;
    minPrice: number;
    maxPrice: number;
};

export type GetFilterTaskByTypeRequest = {
    page: number;
    type: string;
};