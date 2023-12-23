import path from 'path'
import main_path from '../../helpers/path'
import fs from 'fs'
import { error } from 'console';
const file_path = path.join(main_path, 'data', 'products.json')

type ProductData = {
    [key: string]: {
        name: string;
        price: number;
    };
};

export default class Product {
    public name?: string
    public price?: number = 0

    constructor(name?: string, price?: number) {
        this.name = name;
        this.price = price
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
        this.fetchProductFromFile(file_path, (data: ProductData) => {
            let products: ProductData = data || {};
            const key = Object.keys(products).length.toString()
            products[key] = { name: this.name || '', price: this.price || 0}
            fs.writeFile(file_path, JSON.stringify(products), (err) => {
                if (err) {
                    console.log('Write File Error');
                    console.log(err);
                } else {
                    console.log("write file successfull");
                }
            })
        })
    }

    static fetchAll(fun: (data: any) => any) {
        const products = new Product();
        products.fetchProductFromFile(file_path, (data) => fun(data))
    }
}