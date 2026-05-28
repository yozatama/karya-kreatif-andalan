import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('super_admin', 'operational_admin')
  @ApiOperation({ summary: 'List all users (admin only)' })
  @ApiQuery({ name: 'search', required: false })
  async findAll(@Query() pagination: PaginationDto, @Query('search') search?: string) {
    return this.usersService.findAll(pagination, search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: { id: string; roles: string[] },
  ) {
    const isAdmin = user.roles.some((r) =>
      ['super_admin', 'operational_admin'].includes(r),
    );
    if (!isAdmin && user.id !== id) {
      throw new ForbiddenException('You can only view your own profile');
    }
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @CurrentUser() user: { id: string; roles: string[] },
  ) {
    const isAdmin = user.roles.some((r) =>
      ['super_admin', 'operational_admin'].includes(r),
    );
    if (!isAdmin && user.id !== id) {
      throw new ForbiddenException('You can only update your own profile');
    }
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @Roles('super_admin')
  @ApiOperation({ summary: 'Delete user (super_admin only)' })
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
