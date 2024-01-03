import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { User } from 'src/model/user.entityt';
import { AdminService } from './admin.service';
import { AuthGuard } from './guards/auth.guard';

@Controller('admin')
export class AdminController {

    constructor(private readonly adminService: AdminService) {}

    @Get()
    getHello(): string {
      return this.adminService.getHello();
    }

    @UseGuards(AuthGuard)
    @Get('users')
    async getUsers(): Promise<User[]> {
        return await this.adminService.getUsers();
    }

    @Post('singin')
    signIn(@Body() signInDto: Record<string, any>) {
       return this.adminService.signIn(signInDto.username, signInDto.password);
    }
}
