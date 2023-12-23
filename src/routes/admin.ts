import express, {Express, Response, Request, NextFunction} from "express";
import path from 'path';
import { getAddProduct, postAddProduct } from '../controllers';

const Router = express.Router()
 function admin() {
    Router.post('/', postAddProduct);

    // render page
    Router.get('/', getAddProduct);

    return Router;
}

export default admin;