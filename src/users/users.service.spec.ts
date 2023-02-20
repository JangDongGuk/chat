import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChannelMembers } from 'src/entities/ChannelMembers';
import { Users } from 'src/entities/Users';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { DataSource } from 'typeorm/data-source/DataSource';
import { UsersService } from './users.service';

class MockUserRepository {
  #data = [{ email: 'jang@gmail.com', id: 1}];
  findOne({ where: { email }}) {
    const data = this.#data.find((v) => v.email === email);
    if (data) {
      return data
    }
    return null;
  }
}

class MockWorkspaceMembersRepository {}
class MockChannelMembersRepository {}

describe('UsersService', () => {
  let service: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [
          UsersService,
          { provide: DataSource, useClass: class{},},
          { provide: getRepositoryToken(Users), useClass: MockUserRepository},
          { provide: getRepositoryToken(WorkspaceMembers), useClass: MockWorkspaceMembersRepository},
          { provide: getRepositoryToken(ChannelMembers), useClass: MockChannelMembersRepository},
        ],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findByEmail은 이메일을 통해 유저를 찾아야함', async() => {
    await expect(service.findByEmail('jang@gmail.com')).resolves.toStrictEqual({ 
      email: 'jang@gmail.com',
      id:1 
    });
  });

  it('findByEmail은 유저를 못 찾으면 null을 반환해야함', async () => {
    await expect(service.findByEmail('jang1@gmail.com')).resolves.toEqual(null);
  });
});
