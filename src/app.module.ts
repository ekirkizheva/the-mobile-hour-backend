import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublicModule } from './public/public.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [PublicModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
