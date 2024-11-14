export class AppError extends Error {
    public statusCode: number;
    public status: string;
    public isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends AppError {
    public errors: any[];

    constructor(message: string, errors: any[]) {
        super(message, 400);
        this.errors = errors;
    }
}

export class NotFoundError extends AppError {
    constructor(resource: string) {
        super(`${resource} not found`, 404);
    }
}

export class DuplicateError extends AppError {
    constructor(message: string) {
        super(message, 409);
    }
}

export class AuthorizationError extends AppError {
    constructor(message: string = 'Not authorized') {
        super(message, 401);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = 'Access forbidden') {
        super(message, 403);
    }
}
