import express, {Express, Response, Request, NextFunction} from "express";
import path from 'path';
import { Product } from "../models"

const Router = express.Router();
const products = new Product("");
export default function shop() {

    Router.get("/", (req: Request, res: Response) => {
        res.render('index', {title: "Shop", products: Product.fetchAll()})
    });

    return Router
};