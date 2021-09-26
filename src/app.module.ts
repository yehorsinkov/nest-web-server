import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.model';
import { Role } from './roles/role.model';
import { UserRolesModule } from './user-roles/user-roles.module';
import { UserRoles } from './user-roles/user-roles.model';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { Product } from './products/product.model';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    UserRolesModule,
    OrdersModule,
    ProductsModule,
    AuthModule,
  ],
})
export class AppModule { }
