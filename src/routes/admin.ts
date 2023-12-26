import express, {Express, Response, Request, NextFunction} from "express";
import path from 'path';
import { getAddProduct, postAddProduct } from '../controllers';

const Router = express.Router()

Router.post('/', postAddProduct);
// render page
Router.get('/', getAddProduct);


export default Router;