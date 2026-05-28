import {
  Controller,
  Get,
  Patch,
  Delete,
  Post,
  Param,
  Body,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PaginationDto } from "../../common/dto/pagination.dto";
import { JwtAuthGuard, RolesGuard } from "../../common/guards";
import { Roles } from "../../common/decorators";

@ApiTags("users")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles("SUPER_ADMIN", "ADMIN")
  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.usersService.findAll(pagination);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Roles("SUPER_ADMIN", "ADMIN")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }

  @Roles("SUPER_ADMIN", "ADMIN")
  @Post(":id/verify")
  verify(@Param("id") id: string) {
    return this.usersService.verify(id);
  }
}
