import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('maintenance')
@Controller('maintenance')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MaintenanceController {
  constructor(private maintenanceService: MaintenanceService) {}

  @Get()
  @ApiOperation({ summary: 'Get all maintenance logs' })
  @ApiResponse({ status: 200, description: 'List of maintenance logs' })
  async findAll() {
    return this.maintenanceService.findAll();
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('SUPER_ADMIN', 'OPERATIONAL_ADMIN', 'MAINTENANCE_TEAM')
  @ApiOperation({ summary: 'Create maintenance log' })
  @ApiResponse({ status: 201, description: 'Maintenance log created' })
  async create(@Body() dto: CreateMaintenanceDto) {
    return this.maintenanceService.create(dto);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('SUPER_ADMIN', 'OPERATIONAL_ADMIN', 'MAINTENANCE_TEAM')
  @ApiOperation({ summary: 'Update maintenance log' })
  @ApiResponse({ status: 200, description: 'Maintenance log updated' })
  async update(@Param('id') id: string, @Body() dto: Partial<CreateMaintenanceDto>) {
    return this.maintenanceService.update(id, dto);
  }

  @Get('vehicle/:vehicleId')
  @ApiOperation({ summary: 'Get maintenance logs for a vehicle' })
  @ApiResponse({ status: 200, description: 'Vehicle maintenance logs' })
  async findByVehicle(@Param('vehicleId') vehicleId: string) {
    return this.maintenanceService.findByVehicle(vehicleId);
  }
}
