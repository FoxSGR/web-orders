import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';

import { CurrentUser } from '../shared';
import { IUser } from '../user';

@Controller('/resources/file')
export class FileController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 20971520 },
      storage: diskStorage({
        destination(req, file, cb) {
          const user = req['user'] as IUser;
          const dest = path.join('.', 'resources', user.resourcesFolder);
          fs.mkdirSync(dest, { recursive: true });
          return cb(null, dest);
        },
        filename(req, file, callback) {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  uploadFile(
    @CurrentUser() user: IUser,
    @UploadedFile() file: Express.Multer.File,
    @Body() body,
  ) {
    return { data: 'OK' };
  }
}
