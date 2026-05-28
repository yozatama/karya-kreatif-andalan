import { Controller, Get, Post, Patch, Param, Body, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Maintenance')
@ApiBearerAuth()
@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Get()
  @Roles('super_admin', 'operational_admin', 'maintenance_team')
  @ApiOperation({ summary: 'List maintenance logs' })
  @ApiQuery({ name: 'vehicleId', required: false })
  @ApiQuery({ name: 'type', required: false })
  async findAll(
    @Query() pagination: PaginationDto,
    @Query('vehicleId') vehicleId?: string,
    @Query('type') type?: string,
  ) {
    return this.maintenanceService.findAll(pagination, vehicleId, type);
  }

  @Post()
  @Roles('super_admin', 'operational_admin', 'maintenance_team')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create maintenance log' })
  async create(@Body() dto: CreateMaintenanceDto) {
    return this.maintenanceService.create(dto);
  }

  @Patch(':id')
  @Roles('super_admin', 'operational_admin', 'maintenance_team')
  @ApiOperation({ summary: 'Update maintenance log' })
  async update(@Param('id') id: string, @Body() dto: UpdateMaintenanceDto) {
    return this.maintenanceService.update(id, dto);
  }

  @Get('upcoming')
  @Roles('super_admin', 'operational_admin', 'maintenance_team')
  @ApiOperation({ summary: 'Get upcoming service schedules' })
  async getUpcoming() {
    return this.maintenanceService.getUpcoming();
  }
}
