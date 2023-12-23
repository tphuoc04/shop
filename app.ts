import express, {Express, Response, Request, NextFunction} from "express";
import http from 'http';
import bodyParser from 'body-parser';
import path from 'path';
// Import Routes
import { admin, shop, cart } from "./src/routes";

//import controller
import { get404 } from './src/controllers';

const app: Express = express();
 
// helpers
app.set("view engine", 'ejs');
app.set('views', "views");
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

// log for incoming request DEBUGGING 
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("Taking request");
    next();
})

// App
app.use('/',shop());
app.use("/add-product", admin());
app.use("/cart", cart());

// 404
app.use(get404);
 
// Run Server
http.createServer(app).listen(3000, () => {
    console.log("app run successfully on port 3000");
})