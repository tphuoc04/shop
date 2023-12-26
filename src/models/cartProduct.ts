import path from 'path'
import main_path from '../../helpers/path'
import fs from 'fs'
import Product from './product';
const file_path = path.join(main_path, 'data', 'cartProducts.json')

type Order = {
    id?: number
    product_id: number
    quantity: number
};

type inCart = {
    id: number
    name: string
    quantity: number
    price: number
    total: number
}[];

export default class CartProduct {
    
    private static fetchProductFromFile(file_path: any, callBack: (data: any) => any) {
        fs.readFile(file_path, (err, productsData: any) => {
            if (err) {
                return callBack([]);
            } else {
                try {
                    // parsed data to JSON
                    const parsedData = JSON.parse(productsData)
                    // pass Parsed Product Data to call back function
                    callBack(parsedData);
                } catch(error) {
                    // Parsing file Error
                    console.log('Parsing Error');
                    console.log(error);
                    
                    // return empty array of product
                    callBack([]);
                }
            }
        })
    }
    
    private add({product_id, quantity}: Order): void{
        CartProduct.fetchProductFromFile(file_path, (data: any) => {
            let orders: Order[] = data;
            orders.push({ 
                id: orders.length,
                product_id: product_id, 
                quantity: quantity})
            fs.writeFile(file_path, JSON.stringify(orders), (err) => {
                if (err) {
                    console.log('Write File Error');
                    console.log(err);
                } else {
                    console.log("write file successfull");
                }
            })
        })
    }
    
    constructor({ product_id, quantity }: {product_id?: number, quantity?: number} = {}) {
        if (product_id != undefined) {
            quantity = quantity?quantity:1
            this.add({ product_id, quantity})
        }
    }

    static inCartProduct(fun: (data: any) => any) {
        CartProduct.fetchAll((orders) => {
            Product.fetchAll((products) => {
                if (orders.length ==0 || products.length == 0) {
                    return []
                } 
                const cart: inCart = orders.map((order: Order) => {
                    return {id: order.id,
                            name: products[order.product_id].name,
                            price: products[order.product_id].price,
                            quantity: order.quantity,
                            total: order.quantity * products[order.product_id].price}
                })
                console.log(cart)
                fun(cart)
            })
        })
    }

    static fetchAll(fun: (data: any) => any) {
        const products = new CartProduct();
        CartProduct.fetchProductFromFile(file_path, (data) => fun(data))
    }
}