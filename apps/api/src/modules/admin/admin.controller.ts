import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('admin')
@Roles('super_admin', 'operational_admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get dashboard statistics' })
  async getDashboard() {
    return this.adminService.getDashboardStats();
  }

  @Get('revenue')
  @ApiOperation({ summary: 'Get revenue chart data' })
  @ApiQuery({ name: 'period', enum: ['daily', 'weekly', 'monthly'], required: false })
  async getRevenue(@Query('period') period?: string) {
    return this.adminService.getRevenueChart(period || 'monthly');
  }

  @Get('fleet-utilization')
  @ApiOperation({ summary: 'Get fleet utilization data' })
  async getFleetUtilization() {
    return this.adminService.getFleetUtilization();
  }

  @Get('reports/summary')
  @ApiOperation({ summary: 'Get reports summary' })
  async getReportsSummary() {
    return this.adminService.getReportsSummary();
  }
}
