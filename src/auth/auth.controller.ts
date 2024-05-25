import { Controller, Body, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthDto, AuthResponseDto } from './auth.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() params: AuthDto): Promise<AuthResponseDto> {
    return await this.authService.signIn(params.email, params.password);
  }
}
