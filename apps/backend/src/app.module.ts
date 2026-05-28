import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { configuration } from "./config";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { VehiclesModule } from "./modules/vehicles/vehicles.module";
import { BookingsModule } from "./modules/bookings/bookings.module";
import { PaymentsModule } from "./modules/payments/payments.module";
import { MaintenanceModule } from "./modules/maintenance/maintenance.module";
import { NotificationsModule } from "./modules/notifications/notifications.module";
import { PromosModule } from "./modules/promos/promos.module";
import { SupportModule } from "./modules/support/support.module";
import { AnalyticsModule } from "./modules/analytics/analytics.module";
import { UploadModule } from "./modules/upload/upload.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    VehiclesModule,
    BookingsModule,
    PaymentsModule,
    MaintenanceModule,
    NotificationsModule,
    PromosModule,
    SupportModule,
    AnalyticsModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
