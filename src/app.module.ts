import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublicModule } from './public/public.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.entityt';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './admin/constants/jwt-secret';
import { Product } from './model/product.entity';
import { Feature } from './model/feature.entity';

@Module({
  imports: [PublicModule, AdminModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Qwertyu123',
      database: 'the_mobile_hour',
      entities: [User, Product, Feature],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
