import { Body, Controller, Get, HttpCode, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { JwtPayload } from "@daily-drop/types";
import { Request as ExpressRequest } from "express";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto)
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto)
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async me(@Request() req: ExpressRequest & { user: JwtPayload }) {
        return req.user
    }
}