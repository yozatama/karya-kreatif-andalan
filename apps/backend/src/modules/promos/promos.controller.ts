import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { PromosService } from "./promos.service";
import { CreatePromoDto } from "./dto/create-promo.dto";
import { ValidatePromoDto } from "./dto/validate-promo.dto";
import { JwtAuthGuard, RolesGuard } from "../../common/guards";
import { Roles } from "../../common/decorators";

@ApiTags("promos")
@Controller("promos")
export class PromosController {
  constructor(private readonly promosService: PromosService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "ADMIN")
  @Get()
  findAll() {
    return this.promosService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "ADMIN")
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.promosService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "ADMIN")
  @Post()
  create(@Body() dto: CreatePromoDto) {
    return this.promosService.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "ADMIN")
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: Partial<CreatePromoDto>) {
    return this.promosService.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "ADMIN")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.promosService.remove(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post("validate")
  @HttpCode(HttpStatus.OK)
  validate(@Body() dto: ValidatePromoDto) {
    return this.promosService.validate(dto);
  }
}
