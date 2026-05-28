import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleFilterDto } from './dto/vehicle-filter.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all vehicles with filters' })
  @ApiResponse({ status: 200, description: 'List of vehicles' })
  async findAll(@Query() filter: VehicleFilterDto) {
    return this.vehiclesService.findAll(filter);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all vehicle categories' })
  @ApiResponse({ status: 200, description: 'List of categories' })
  async getCategories() {
    return this.vehiclesService.getCategories();
  }

  @Post('categories')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'OPERATIONAL_ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a vehicle category (admin)' })
  @ApiResponse({ status: 201, description: 'Category created' })
  async createCategory(
    @Body('name') name: string,
    @Body('description') description?: string,
    @Body('icon') icon?: string,
  ) {
    return this.vehiclesService.createCategory(name, description, icon);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get vehicle by ID' })
  @ApiResponse({ status: 200, description: 'Vehicle found' })
  @ApiResponse({ status: 404, description: 'Vehicle not found' })
  async findById(@Param('id') id: string) {
    return this.vehiclesService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'OPERATIONAL_ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new vehicle (admin)' })
  @ApiResponse({ status: 201, description: 'Vehicle created' })
  async create(@Body() dto: CreateVehicleDto) {
    return this.vehiclesService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'OPERATIONAL_ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a vehicle (admin)' })
  @ApiResponse({ status: 200, description: 'Vehicle updated' })
  async update(@Param('id') id: string, @Body() dto: UpdateVehicleDto) {
    return this.vehiclesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'OPERATIONAL_ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a vehicle (admin)' })
  @ApiResponse({ status: 200, description: 'Vehicle deleted' })
  async remove(@Param('id') id: string) {
    return this.vehiclesService.remove(id);
  }
}
