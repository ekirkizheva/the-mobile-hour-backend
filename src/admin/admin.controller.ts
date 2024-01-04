import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Product } from 'src/model/product.entity';
import { User } from 'src/model/user.entityt';
import { AdminService } from './admin.service';
import { AdminGuard } from './guards/admin.guard';

@Controller('admin')
export class AdminController {

    constructor(private readonly adminService: AdminService) {}

    @UseGuards(AdminGuard)
    @Get('users')
    async getUsers(): Promise<User[]> {
        return await this.adminService.getUsers();
    }

    @UseGuards(AdminGuard)
    @Post('product') 
    async postProduct(@Body() productDTO: Product) {
      return await this.adminService.postProduct(productDTO);
    }
}
