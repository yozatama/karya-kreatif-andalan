import {
  Controller,
  Get,
  Patch,
  Post,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { NotificationsService } from "./notifications.service";
import { JwtAuthGuard } from "../../common/guards";
import { CurrentUser } from "../../common/decorators";

@ApiTags("notifications")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  findAll(@CurrentUser("id") userId: string) {
    return this.notificationsService.findByUser(userId);
  }

  @Patch(":id/read")
  markAsRead(@Param("id") id: string) {
    return this.notificationsService.markAsRead(id);
  }

  @Post("read-all")
  @HttpCode(HttpStatus.OK)
  markAllAsRead(@CurrentUser("id") userId: string) {
    return this.notificationsService.markAllAsRead(userId);
  }
}
