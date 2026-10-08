import { ConflictException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from '../db/schema'
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./dto/register.dto";
import { eq } from "drizzle-orm";
import * as bcrypt from 'bcrypt'
import { JwtPayload, UserRole } from "@daily-drop/types";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        @Inject('DB') private db: NeonHttpDatabase<typeof schema>,
        private jwtService: JwtService
    ) { }
    async register(dto: RegisterDto) {
        const [existing] = await this.db
            .select()
            .from(schema.users)
            .where(eq(schema.users.email, dto.email)).execute()
        if (existing) {
            throw new ConflictException("Email already exists")
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10)

        const [user] = await this.db.
            insert(schema.users)
            .values({
                firstName: dto.firstName,
                lastName: dto.lastName,
                email: dto.email,
                password: hashedPassword,
                phoneNumber: dto.phoneNumber,
                role: dto.role
            }).returning()

        return {
            user: this.sanitizeUser(user),
            token: this.generateToken(user)
        };
    }

    async login(dto: LoginDto) {
        const [user] = await this.db
            .select()
            .from(schema.users)
            .where(eq(schema.users.email, dto.email)).execute()
        if (!user) throw new UnauthorizedException('Invalid email')
        const isValidPassword = await bcrypt.compare(dto.password, user.password)
        if (!isValidPassword) throw new UnauthorizedException('Invalid password')
        return {
            user: this.sanitizeUser(user),
            token: this.generateToken(user)
        }
    }

    private generateToken(user: schema.NewUser) {
        const payload: JwtPayload = {
            sub: user.id!,
            email: user.email!,
            role: user.role as UserRole
        }
        return this.jwtService.sign(payload)
    }

    private sanitizeUser(user: schema.User) {
        const { password, ...safeUser } = user;
        void password;
        return safeUser
    }
}