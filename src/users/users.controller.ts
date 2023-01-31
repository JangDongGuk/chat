import { Body, Controller, Get, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { undefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.interceptor';
import { UserDto } from 'src/common/user.dto';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

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
        return user;
    }

    @ApiOperation({ summary: '회원가입'})
    @Post()
    postUser(@Body() data: JoinRequestDto) {
        this.usersService.postUsers(data.email, data.nickname, data.password);
    }

    @ApiResponse({
        status: 200,
        description:'성공',
        type: UserDto
    })
    @ApiResponse({
        status: 500,
        description:'서버 에러',

    })
    @ApiOperation({ summary: '로그인'})
    @Post('login')
    login(@User() user) {
        return user;
    }

    @ApiResponse({
        status: 500,
        description:'서버 에러',

    })
    @ApiOperation({ summary: '로그아웃'})
    @Post('logout')
    logOut(@Req() req, @Res() res) {
        req.logOut();
        res.clearCookie('connect.sid', { httpOnly: true });
        res.send('ok');
    }
}
