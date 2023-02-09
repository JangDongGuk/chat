import { Body, Controller, Get, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { undefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.interceptor';
import { UserDto } from 'src/common/dto/user.dto';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { NotLoggedInGuard } from 'src/auth/not-logged-in.guard';

@UseInterceptors(undefinedToNullInterceptor)
@ApiTags('users')
@Controller('api/users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiResponse({
        status: 200,
        description:'성공',
        type: UserDto
    })
    @ApiResponse({
        status: 500,
        description:'서버 에러',
    })
    @ApiOperation({ summary: '내정보 조회'})
    @Get()
    getUsers(@User() user) {
        return user || false;
    }
    @UseGuards(new NotLoggedInGuard())
    @ApiOperation({ summary: '회원가입'})
    @ApiResponse({ status: 201, description: 'success'})
    @Post()
    async postUsers(@Body() body: JoinRequestDto) {
        await this.usersService.postUsers(body.email, body.nickname, body.password);
    }
    
    @ApiResponse({
        status: 201,
        description:'성공',
        type: UserDto
    })
    @ApiResponse({
        status: 500,
        description:'서버 에러',
    })
    @ApiOperation({ summary: '로그인'})
    @UseGuards(new LocalAuthGuard())
    @Post('login')
    login(@User() user) {
        return user;
    }

    @ApiResponse({
        status: 500,
        description:'서버 에러',
    })
    @UseGuards(new LoggedInGuard())
    @ApiOperation({ summary: '로그아웃'})
    @Post('logout')
    logOut(@Req() req, @Res() res) {
        req.logOut();
        res.clearCookie('connect.sid', { httpOnly: true });
        res.send('ok');
    }
}
