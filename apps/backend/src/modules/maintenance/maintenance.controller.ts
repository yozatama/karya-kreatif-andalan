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
import { MaintenanceService } from "./maintenance.service";
import { CreateMaintenanceDto } from "./dto/create-maintenance.dto";
import { UpdateMaintenanceDto } from "./dto/update-maintenance.dto";
import { PaginationDto } from "../../common/dto/pagination.dto";
import { JwtAuthGuard, RolesGuard } from "../../common/guards";
import { Roles } from "../../common/decorators";

@ApiTags("maintenance")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("SUPER_ADMIN", "ADMIN")
@Controller("maintenance")
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.maintenanceService.findAll(pagination);
  }

  @Get("upcoming")
  findUpcoming() {
    return this.maintenanceService.findUpcoming();
  }

  @Get("vehicle/:vehicleId")
  findByVehicle(@Param("vehicleId") vehicleId: string) {
    return this.maintenanceService.findByVehicle(vehicleId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.maintenanceService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateMaintenanceDto) {
    return this.maintenanceService.create(dto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateMaintenanceDto) {
    return this.maintenanceService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.maintenanceService.remove(id);
  }
}
