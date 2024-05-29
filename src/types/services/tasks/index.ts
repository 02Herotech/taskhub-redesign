
export type Task = {
    id: number;
    posterId: number;
    taskBriefDescription: string;
    taskDescription: string;
    taskImage: string;
    taskTime: string;
    taskDate: [number, number, number];
    hubTime: string | null;
    taskType: string;
    taskStatus: string;
    taskAddress: string | null;
    createdAt: [number, number, number];
    customerBudget: number;
    active: boolean;
};

export type CustomerTasks = {
    id: number;
    posterId: number;
    taskBriefDescription: string;
    taskDescription: string;
    taskImage: string;
    taskTime: string;
    taskDate: [number, number, number];
    hubTime: string | null;
    taskType: string;
    taskStatus: string;
    taskAddress: string | null;
    createdAt: [number, number, number];
    customerBudget: number;
    active: boolean;
}

export type GetCustomerTasksResponse = CustomerTasks[];

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