export type SignUpRequest = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
    password: string;
};

export type SignUpResponse = {
    status: number;
    data: {
        data: any;
        message: string;
        status: string;
    };
}

export type InitiateResetPasswordRequest = {
    email: string;
};

export type InitiateResetPasswordResponse = {
    message: string;
    status: string;
};

export type CompleteResetPasswordRequest = {
    email: string;
    token: string;
    password: string;
};

export type CompleteResetPasswordResponse = {
    message: string;
    status: string;
};
