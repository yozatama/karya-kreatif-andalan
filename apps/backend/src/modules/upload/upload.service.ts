import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class UploadService {
  constructor(private configService: ConfigService) {}

  async uploadImage(file: Express.Multer.File) {
    // Placeholder: upload to S3/R2
    const key = `images/${uuidv4()}-${file?.originalname || "upload.jpg"}`;
    const url = await this.uploadToStorage(key, file);
    return { url, key, type: "image" };
  }

  async uploadDocument(file: Express.Multer.File) {
    // Placeholder: upload to S3/R2
    const key = `documents/${uuidv4()}-${file?.originalname || "upload.pdf"}`;
    const url = await this.uploadToStorage(key, file);
    return { url, key, type: "document" };
  }

  private async uploadToStorage(key: string, _file: Express.Multer.File): Promise<string> {
    // Placeholder for S3/R2 integration
    const endpoint = this.configService.get<string>("storage.endpoint") || "https://storage.example.com";
    return `${endpoint}/${key}`;
  }
}
