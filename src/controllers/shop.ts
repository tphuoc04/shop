import express, { Request, Response, NextFunction } from 'express';
import { Product } from "../models"

const products = new Product("");

const getShop = (req: Request, res: Response) => {
    Product.fetchAll((data) => {
        // res.render('index', {title: "Shop", products: data})
        res.send(data)
        // console.log(products)
    })
}

const getDetail = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.productId.toString();
    Product.fetchAll((data) => {
        // console.log(id)
        res.render('detail', {
            title: "Detail " + data[id].name, 
            name: data[id].name, 
            price: data[id].price, 
            id: id
        })
        // console.log(products)
    })
}

export { getShop, getDetail };