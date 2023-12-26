import { Request, Response, NextFunction } from "express"
import { cartProduct, Product } from '../models'

type Order = {
    product_id: number
    quantity: number
};

const getCartProducts = (req: Request, res: Response, next: NextFunction) => {
    cartProduct.inCartProduct(
        (data) => {
            res.render('cart', {title: "Cart", cartProducts: data})
        }
    )
}

const postCartProducts = (req: Request, res: Response, next: NextFunction) => {
    const order: Order = { 
        product_id: parseFloat(req.params.id),
        quantity: parseFloat(req.body.quantity)
    }

    const addToCart = new cartProduct(order);
    console.log('added')
    res.redirect('/cart')
}

export { getCartProducts, postCartProducts }