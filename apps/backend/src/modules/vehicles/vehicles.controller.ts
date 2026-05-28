import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { VehiclesService } from "./vehicles.service";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
import { FilterVehicleDto } from "./dto/filter-vehicle.dto";
import { JwtAuthGuard, RolesGuard } from "../../common/guards";
import { Roles, Public } from "../../common/decorators";

@ApiTags("vehicles")
@Controller("vehicles")
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Public()
  @Get()
  findAll(@Query() filter: FilterVehicleDto) {
    return this.vehiclesService.findAll(filter);
  }

  @Public()
  @Get("categories")
  getCategories() {
    return this.vehiclesService.getCategories();
  }

  @Public()
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.vehiclesService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "ADMIN")
  @Post()
  create(@Body() dto: CreateVehicleDto) {
    return this.vehiclesService.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "ADMIN")
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateVehicleDto) {
    return this.vehiclesService.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "ADMIN")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.vehiclesService.remove(id);
  }
}
