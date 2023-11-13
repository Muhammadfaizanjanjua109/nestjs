// src/middlewares/static-assets.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as express from 'express';
import * as path from 'path';

@Injectable()
export class StaticAssetsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const basePath = path.join(__dirname, '../uploads');
    console.log(path.resolve(basePath),'path')
    // Serve static files from the 'uploads' directory
    express.static(basePath)(req, res, next);
  }
}
