import { Request, Response, NextFunction } from 'express';
import { Product } from '../models'

const getAddProduct = (req: Request, res: Response, next: NextFunction) => {
    res.render('add-product', {title: "Add Product"});
}

const postAddProduct = (req: Request, res: Response, next: NextFunction) => {
    const products = new Product(req.body.title);
    products.add();
    console.log(Product.fetchAll());
    res.redirect("/");
}

export { getAddProduct, postAddProduct };