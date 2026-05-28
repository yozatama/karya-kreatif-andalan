import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags, ApiBearerAuth, ApiConsumes } from "@nestjs/swagger";
import { UploadService } from "./upload.service";
import { JwtAuthGuard } from "../../common/guards";

@ApiTags("upload")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post("image")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadImage(file);
  }

  @Post("document")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  uploadDocument(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadDocument(file);
  }
}
