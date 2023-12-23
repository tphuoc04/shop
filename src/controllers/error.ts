import { Response, Request, NextFunction } from 'express';

export default function get404 (req: Request, res: Response, next: NextFunction) {
    res.status(404).render('404', {title: "404"});
}