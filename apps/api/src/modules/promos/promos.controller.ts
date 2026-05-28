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
import { PromosService } from './promos.service';
import { CreatePromoDto } from './dto/create-promo.dto';
import { ValidatePromoDto } from './dto/validate-promo.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Promos')
@Controller('promos')
export class PromosController {
  constructor(private readonly promosService: PromosService) {}

  @Post()
  @Roles('super_admin', 'operational_admin')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a promo (admin)' })
  async create(@Body() dto: CreatePromoDto) {
    return this.promosService.create(dto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'List active promos (public)' })
  async findAll(@Query() pagination: PaginationDto) {
    return this.promosService.findAll(pagination, true);
  }

  @Patch(':id')
  @Roles('super_admin', 'operational_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a promo (admin)' })
  async update(@Param('id') id: string, @Body() dto: Partial<CreatePromoDto>) {
    return this.promosService.update(id, dto);
  }

  @Delete(':id')
  @Roles('super_admin', 'operational_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a promo (admin)' })
  async delete(@Param('id') id: string) {
    return this.promosService.delete(id);
  }

  @Post('validate')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Validate a promo code' })
  async validate(@Body() dto: ValidatePromoDto) {
    return this.promosService.validate(dto);
  }
}
