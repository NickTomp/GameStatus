import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { logger } from "../config/logger";
import { prismaErrors } from "../errors/prismaErrors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const errorMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    //БАЗА
    let statusCode = 500;
    let message = "Internal Server Error";
    let details: any = null;
    // Мои custom ошибки api
    if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    //Ошибки Prisma
    else if (err instanceof PrismaClientKnownRequestError) {
        const prismaError = prismaErrors[err.code];
        if (prismaError) {
            statusCode = prismaError.status;
            message = prismaError.message;
        } else {
            statusCode = 500;
            message = err.message;
        }
    }

    logger.error({
        message: err.message,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method,
    });

    res.status(statusCode).json({
        success: false,
        message,
    });
};