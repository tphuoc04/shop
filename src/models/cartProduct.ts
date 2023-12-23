import path from 'path'
import main_path from '../../helpers/path'
import fs from 'fs'
import { error } from 'console';
import Product from './product';
const file_path = path.join(main_path, 'data', 'cartProducts.json')

type Order = {
    [id: string]: { 
        product_id?: number
        quantity?: number
    }
};

type inCart = {
    [id: string]: {
        name: string
        quantity: number
        price: number
        total: number
    }
};

export default class cartProduct {
    private id?: number
    private product_id?: number
    private quantity: number = 0

    constructor({ product_id, quantity }: any = {}) {
        this.product_id = product_id
        this.quantity = quantity || 1
    }

    fetchProductFromFile(file_path: any, callBack: (data: any) => any) {
        fs.readFile(file_path, (err, productsData: any) => {
            if (err) {
                return callBack({});
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
                    callBack({});
                }
            }
        })
    }

    add(): void{
        this.fetchProductFromFile(file_path, (data: any) => {
            let orders: Order = data;
            const orderId = Object.keys(orders).length.toString()
            orders[orderId] = { 
                "product_id": this.product_id, 
                "quantity": this.quantity
            }
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

    static inCartProduct(callBack: (data: any) => any) {
        const products = new cartProduct();
        products.fetchProductFromFile(file_path, (data) => {
            Product.fetchAll(
                (products) => {
                    const orderId = Object.keys(data)
                    const productsArray = Object.entries(products)
                    let ordedCart: inCart = {}
                    for (let key in data) {
                        ordedCart[key] = {
                            name: products[data[key].product_id].name,
                            quantity: data[key].quantity,
                            price: products[data[key].product_id].price,
                            total: data[key].quantity * products[data[key].product_id].price
                        }
                    }
                    console.log(ordedCart)
                    return callBack(ordedCart)
                }
            )
        })
    }

    static fetchAll(fun: (data: any) => any) {
        const products = new cartProduct();
        products.fetchProductFromFile(file_path, (data) => fun(data))
    }
}