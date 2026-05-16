import { JWT_SCRECT } from "@repo/backend-common/config";
import e, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export const middleware = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers["authorization"] ?? "";
    const userId = jwt.verify(token, JWT_SCRECT)

    if(userId) {
        //@ts-ignore
        req.userId = userId.userId;
        next();
    } else {
        res.status(403).json({
            "message": "Unauthorized"
        })
    }

}