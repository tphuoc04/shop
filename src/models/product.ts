import path from "path";
import main_path from '../../helpers/path'
import fs from 'fs';
const file_path = path.join(main_path, 'data', 'products.json')

type ProductData = {
    id?: number;
    name: string;
    price: number;
    imgURL?: string
    description?: string
};


export default class Product {
    private add(name: string, price: number, imgURL?: string, description?: string): void{
        Product.fetchProductFromFile(file_path, (data: ProductData[]) => {
            const products: ProductData[] = data;
            products.push({ 
                id: products.length,
                name: name,
                price: price,
                imgURL: imgURL || "",
                description: description || ""})
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
    
    private static fetchProductFromFile(file_path: any, callBack: (data: ProductData[]) => any): void {
        fs.readFile(file_path, (err, productsData: any) => {
            if (err) {
                return callBack([]);
            } else {
                try {
                    // parsed data to JSON
                    const parsedData: ProductData[] = JSON.parse(productsData)
                    // pass Parsed Product Data to call back function
                    callBack(parsedData);
                } catch(error) {
                    // Parsing file Error
                    console.log('Parsing Error at Cart');
                    console.log(error);
    
                    // return empty array of product
                    callBack([]);
                }
            }
        })
    }
    constructor({});
    constructor({name, price, imgURL, description}: ProductData);

    constructor({name, price, imgURL, description}: ProductData) {
        if (name != undefined && price != undefined) this.add(name, price, imgURL, description)
    }
    


    static fetchAll(fun: (data: any) => any) {
        // Pass an empty object or provide the required properties
        Product.fetchProductFromFile(file_path, (data) => fun(data))
    }
}