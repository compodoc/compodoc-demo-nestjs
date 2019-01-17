import { HttpException } from '@nestjs/core';
import { Middleware, NestMiddleware, HttpStatus } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { SECRET } from '../config';
import { UserService } from './user.service';

@Middleware()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  resolve(): (req: Request, res: Response, next: NextFunction) => void {

    return async (req: Request, res: Response, next: NextFunction) => {
      if (req.headers.authorization && (req.headers.authorization as string).split(' ')[0] === 'Token') {
        const token = (req.headers.authorization as string).split(' ')[1];
        const decoded: any = jwt.verify(token, SECRET);
        const user = await this.userService.findById(decoded.id);

        if (!user) {
          throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
        }

        req.user = user.user;
        next();

      } else {
        throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);

      }
    };
  }
}