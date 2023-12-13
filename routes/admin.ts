import express, {Express, Response, Request, NextFunction} from "express";
import * as fs from 'fs';

const html = fs.readFileSync('./index.html', 'utf-8');
const route = express.Router()

export default function admin() {

    route.get('/', (req: Request, res: Response, next: NextFunction) => {
        res.send(html);
    })

    return route;
}