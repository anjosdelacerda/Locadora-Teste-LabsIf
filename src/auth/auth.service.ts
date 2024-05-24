import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './auth.dto';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  private jwtExpirationTimeSeconds: number;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeSeconds = +this.configService.get<number>(
      'JWT_TIME_EXPIRATION',
    );
  }

  async signIn(email: string, password: string): Promise<AuthResponseDto> {
    const foundUser = await this.userService.findByEmail(email);

    if (!foundUser || !compareSync(password, foundUser.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: foundUser.id };
    const token = this.jwtService.sign(payload);
    return { token, expiresIn: this.jwtExpirationTimeSeconds };
  }
}
