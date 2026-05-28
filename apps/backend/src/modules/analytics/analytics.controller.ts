import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { AnalyticsService } from "./analytics.service";
import { JwtAuthGuard, RolesGuard } from "../../common/guards";
import { Roles } from "../../common/decorators";

@ApiTags("analytics")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("SUPER_ADMIN", "ADMIN")
@Controller("analytics")
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get("dashboard")
  getDashboard() {
    return this.analyticsService.getDashboard();
  }

  @Get("revenue")
  getRevenue() {
    return this.analyticsService.getRevenue();
  }

  @Get("fleet")
  getFleet() {
    return this.analyticsService.getFleet();
  }

  @Get("drivers")
  getDrivers() {
    return this.analyticsService.getDrivers();
  }
}
