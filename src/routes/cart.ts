import express, { Request, Response, NextFunction } from 'express';
import { getCartProducts, postCartProducts } from "../controllers"
const Router = express.Router()

Router.get('/', getCartProducts)
Router.post('/:id', postCartProducts)


export default Router;