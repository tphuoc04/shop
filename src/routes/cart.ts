import express, { Request, Response, NextFunction } from 'express';
import { getCartProducts, postCartProducts } from "../controllers"
const Router = express.Router()

const cart = () => {
    Router.get('/', getCartProducts)
    Router.post('/:id', postCartProducts)
    return Router
}

export default cart;