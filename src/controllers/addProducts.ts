import { Request, Response, NextFunction } from 'express';
import { Product } from '../models'

const getAddProduct = (req: Request, res: Response, next: NextFunction) => {
    res.render('admin/add-product', {title: "Add Product"});
}

const postAddProduct = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const products = new Product(req.body);
    // console.log('Product: '+ Product.fetchAll((data: any) => { return data;}));
    res.redirect("/");
}

export { getAddProduct, postAddProduct };