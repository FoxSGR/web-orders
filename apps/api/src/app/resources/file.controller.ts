import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import 'multer';

@Controller('/resources/file')
export class FileController {
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
