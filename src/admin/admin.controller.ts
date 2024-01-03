import { Controller, Get } from '@nestjs/common';
import { User } from 'src/model/user.entityt';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {

    constructor(private readonly adminService: AdminService) {}

    @Get()
    getHello(): string {
      return this.adminService.getHello();
    }


    @Get('users')
    async getUsers(): Promise<User[]> {
        return await this.adminService.getUsers();
    }
}
