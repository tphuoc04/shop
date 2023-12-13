import express, {Express, Response, Request, NextFunction} from "express";

const Router = express.Router();
export default function shop() {
    
    Router.get("/hi", (req: Request, res: Response) => {
        res.send('<h1 style="color: yellow;">HIIIII ${i}</h1>');
    });

    return Router
};