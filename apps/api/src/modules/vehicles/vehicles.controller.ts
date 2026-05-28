import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleFilterDto } from './dto/vehicle-filter.dto';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List vehicles with filters (public)' })
  async findAll(@Query() filter: VehicleFilterDto) {
    return this.vehiclesService.findAll(filter);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get vehicle by ID (public)' })
  async findOne(@Param('id') id: string) {
    return this.vehiclesService.findById(id);
  }

  @Post()
  @Roles('super_admin', 'operational_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a vehicle (admin only)' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateVehicleDto) {
    return this.vehiclesService.create(dto);
  }

  @Patch(':id')
  @Roles('super_admin', 'operational_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a vehicle (admin only)' })
  async update(@Param('id') id: string, @Body() dto: UpdateVehicleDto) {
    return this.vehiclesService.update(id, dto);
  }

  @Delete(':id')
  @Roles('super_admin', 'operational_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a vehicle (admin only)' })
  async delete(@Param('id') id: string) {
    return this.vehiclesService.delete(id);
  }

  @Post(':id/images')
  @Roles('super_admin', 'operational_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload vehicle image (admin only)' })
  async uploadImage(
    @Param('id') id: string,
    @Body() body: { imageUrl: string; order?: number },
  ) {
    return this.vehiclesService.uploadImage(id, body.imageUrl, body.order);
  }
}
