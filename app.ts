import express, {Express, Response, Request, NextFunction} from "express";
import bodyParser from 'body-parser';
import { admin, shop } from "./routes";
// console.log(html);
const app: Express = express();
let i = 0;
app.use(bodyParser.urlencoded({extended: false}))
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("reqest: " + i);
    ++i;
    next();
})

// App
app.use(shop());
app.use("/admin", admin());

// 404
app.use((req: Request, res: Response, next: NextFunction) => {
    res.send("Loi Roi ban Oi, Loi 404")
});

app.listen(3000, () => {
    console.log("app run successfully on port 3000");
})