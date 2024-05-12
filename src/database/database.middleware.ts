import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from './entities/user/user.service';

@Injectable()
export class DBMiddleware implements NestMiddleware {
    constructor(private user: UserService) { }
    use(req: Request, res: Response, next: NextFunction) {
        // Ваша логика аутентификации здесь
        const { authorization } = req.headers;
        // if (!authorization) {
        //     return res.status(401).send('Authorization header is required');
        // }

        // Проверяем, что заголовок содержит логин и пароль
        const [login, password] = Buffer.from(authorization.split(' ')[1], 'base64')
            .toString()
            .split(':');

        // if (!login || !password) {
        //     return res.status(401).send('Invalid authorization header');
        // }

        // Проверяем, существует ли такой пользователь с таким паролем
        const user = this.user.findWithPassword({login: login, password: password});
        // if (!user) {
        //     return res.status(401).send('Invalid login or password');
        // }
        if (user) {
            req.body.user = user;
        }

        // Далее вы можете провести дополнительные действия, если пользователь аутентифицирован,
        // например, установить его в объект запроса для дальнейшего использования


        next();
    }
}