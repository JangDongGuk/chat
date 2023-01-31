import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('channels')
@Controller('api/workspaces/:url/channels')
export class ChannelsController {
    @Get()
    getAllChannels() {}
    // 채널들을 다 불러온다
    @Post()
    createChannels() {}
    // 채널을 생성한다
    @Get(':name')
    getSpecificChannel() {}
    // 해당 name이 채널이 등록된 채널을 가져온다
    @Get(':name/chats')
    // 해당 name의 채널의 갯수를 가져온다
    getChats(@Query() query, @Param() param) {
        console.log(query.perPage, query.page);
        console.log(param.id, param.url);
    }

    @Post(':name/chats')
    postChat(@Body() body) {}

    @Get(':name/members')
    getAllMembers() {}

    @Post(':name/members')
    inviteMembers() {}
}
