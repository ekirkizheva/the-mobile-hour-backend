import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { User } from 'src/model/user.entityt';
import { AdminService } from './admin.service';
import { AdminGuard } from './guards/admin.guard';

@Controller('admin')
export class AdminController {

    constructor(private readonly adminService: AdminService) {}

    @Get()
    getHello(): string {
      return this.adminService.getHello();
    }

    @UseGuards(AdminGuard)
    @Get('users')
    async getUsers(): Promise<User[]> {
        return await this.adminService.getUsers();
    }
}
