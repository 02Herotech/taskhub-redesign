
export type Task = {
    id: number;
    posterId: number;
    taskBriefDescription: string;
    taskDescription: string;
    taskImage: string;
    category: {
        id: number;
        categoryName: string;
    }
    taskTime: string;
    taskDate: [number, number, number];
    hubTime: string | null;
    taskType: string;
    taskStatus: string;
    state: string | null;
    postCode: string | number | null;
    suburb: string | null;
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
    category: {
        id: number;
        categoryName: string;
    }
    hubTime: string | null;
    taskType: string;
    taskStatus: string;
    state: string | null;
    postCode: string | number | null;
    suburb: string | null;
    createdAt: [number, number, number];
    customerBudget: number;
    active: boolean;
}

export type GetCustomerTasksResponse = CustomerTasks[];

export type GetTasksRequest = number;

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

export type GetTaskByTextRequest = {
    pageNumber: number;
    text: string;
};