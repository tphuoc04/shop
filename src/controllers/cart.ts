import { Request, Response, NextFunction } from "express"
import { cartProduct, Product } from '../models'

type Order = {
    product_id?: String
    quantity?: number
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
        "product_id": req.params.id,
        "quantity": req.body.quantity
    }

    const addToCart = new cartProduct(order);
    addToCart.add()
    console.log('added')
    res.redirect('/cart')
}

export { getCartProducts, postCartProducts }