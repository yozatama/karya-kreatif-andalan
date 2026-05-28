import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PromosService } from './promos.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('promos')
@Controller('promos')
export class PromosController {
  constructor(private promosService: PromosService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active promos' })
  @ApiResponse({ status: 200, description: 'List of promos' })
  async findAll() {
    return this.promosService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'OPERATIONAL_ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a promo (admin)' })
  @ApiResponse({ status: 201, description: 'Promo created' })
  async create(@Body() data: any) {
    return this.promosService.create(data);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'OPERATIONAL_ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a promo (admin)' })
  @ApiResponse({ status: 200, description: 'Promo updated' })
  async update(@Param('id') id: string, @Body() data: any) {
    return this.promosService.update(id, data);
  }

  @Post('validate')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Validate a promo code' })
  @ApiResponse({ status: 200, description: 'Promo validation result' })
  async validateCode(@Body('code') code: string, @Body('rentalDays') rentalDays: number) {
    return this.promosService.validateCode(code, rentalDays);
  }
}
