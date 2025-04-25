export type ReviewRequest = {
  categoryId: number;
  serviceProviderId: number;
  reviewerUserId: number;
  customerId: number;
  rating: number;
  comment: string;
};

export type ReviewResponse = {
  data: object;
  message: string;
  statusCode: string;
  successful: boolean;
};
