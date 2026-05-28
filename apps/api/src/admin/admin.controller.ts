import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'OPERATIONAL_ADMIN', 'FINANCE_ADMIN')
@ApiBearerAuth()
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get dashboard statistics' })
  @ApiResponse({ status: 200, description: 'Dashboard stats' })
  async getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('revenue')
  @ApiOperation({ summary: 'Get revenue chart data' })
  @ApiResponse({ status: 200, description: 'Revenue data' })
  async getRevenueChart() {
    return this.adminService.getRevenueChart();
  }

  @Get('fleet-utilization')
  @ApiOperation({ summary: 'Get fleet utilization data' })
  @ApiResponse({ status: 200, description: 'Fleet utilization' })
  async getFleetUtilization() {
    return this.adminService.getFleetUtilization();
  }

  @Get('driver-retention')
  @ApiOperation({ summary: 'Get driver retention analytics' })
  @ApiResponse({ status: 200, description: 'Driver retention data' })
  async getDriverRetention() {
    return this.adminService.getDriverRetention();
  }
}
