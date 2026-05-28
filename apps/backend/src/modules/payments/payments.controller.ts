import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { JwtAuthGuard } from "../../common/guards";
import { CurrentUser, Public } from "../../common/decorators";

@ApiTags("payments")
@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post("create")
  @HttpCode(HttpStatus.CREATED)
  create(@CurrentUser("id") userId: string, @Body() dto: CreatePaymentDto) {
    return this.paymentsService.create(userId, dto);
  }

  @Public()
  @Post("webhook")
  @HttpCode(HttpStatus.OK)
  handleWebhook(@Body() payload: any) {
    return this.paymentsService.handleWebhook(payload);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentsService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("user/:userId")
  findByUser(@Param("userId") userId: string) {
    return this.paymentsService.findByUser(userId);
  }
}
