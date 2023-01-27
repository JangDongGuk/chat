import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('workspaces')
@Controller('api/workspaces')
export class WorkspacesController {
    @Get()
    getMyWorkspaces() {}
    // 나의 wokrsapces 를 가져온다
    @Post()
    createWorkspace() {}
    // worksapces채널을 만든다
    @Get(':url/members')
    getAllMembersFromWorkspace() {}
  
    @Post(':url/members')
    inviteMembersToWorkspace() {}
  
    @Delete(':url/members/:id')
    kickMemberFromWorkspace() {}
  
    @Get(':url/members/:id')
    getMemberInfoInWorkspace() {}
  
    @Get(':url/users/:id')
    DEPRECATED_getMemberInfoInWorkspace() {
      this.getMemberInfoInWorkspace();
    }
}
