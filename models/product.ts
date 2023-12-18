import path from 'path'
import main_path from '../helpers/path'
import fs from 'fs'
import { error } from 'console';
const file_path = path.join(main_path, 'data', 'products.json')


export default class Product {
    public title: String
    constructor(title: String) {
        this.title = title;
    }
    add(): void{
        let products: Array<any> = [];
        fs.readFile(file_path, (err: any, data: any) => {
            if (!err) {
                products = JSON.parse(data);
                products.push({title: this.title, id: products.length})
            } else {
                products = [];
            }
            fs.writeFile(file_path, JSON.stringify(products), (err) => {
                console.log(err)
            })
        })
    }

    static fetchAll() {
        let products: Array<any> = [];
        fs.readFile(file_path, (err: any, data: any) => {
            if (!err || !data) {
                products = JSON.parse(data);
            } else {
                return []
            }
        })
        return products;
    }
}