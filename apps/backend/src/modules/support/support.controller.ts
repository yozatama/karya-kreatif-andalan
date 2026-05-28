import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { SupportService } from "./support.service";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { CreateMessageDto } from "./dto/create-message.dto";
import { JwtAuthGuard, RolesGuard } from "../../common/guards";
import { CurrentUser, Roles } from "../../common/decorators";

@ApiTags("support")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("support")
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Get()
  findAll(@CurrentUser() user: any) {
    const userId = user.role?.name === "CUSTOMER" ? user.id : undefined;
    return this.supportService.findAll(userId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.supportService.findOne(id);
  }

  @Post()
  create(@CurrentUser("id") userId: string, @Body() dto: CreateTicketDto) {
    return this.supportService.create(userId, dto);
  }

  @Post(":id/messages")
  addMessage(
    @Param("id") ticketId: string,
    @CurrentUser("id") senderId: string,
    @Body() dto: CreateMessageDto,
  ) {
    return this.supportService.addMessage(ticketId, senderId, dto);
  }

  @UseGuards(RolesGuard)
  @Roles("SUPER_ADMIN", "ADMIN")
  @Patch(":id/status")
  updateStatus(@Param("id") id: string, @Body("status") status: string) {
    return this.supportService.updateStatus(id, status);
  }
}
