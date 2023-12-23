import express, {Express, Response, Request, NextFunction} from "express";
import path from 'path';
import { getDetail, getShop } from "../controllers"

const Router = express.Router();
export default function shop() {

    Router.get("/", getShop);
    Router.get('/product/:productId', getDetail)

    return Router
};