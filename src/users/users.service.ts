import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { DataSource, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { ChannelMembers } from 'src/entities/ChannelMembers';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(WorkspaceMembers)
        private workspaceMembersRepository: Repository<WorkspaceMembers>,
        @InjectRepository(ChannelMembers)
        private channelMembersRepository: Repository<ChannelMembers>,
        private dataSourece: DataSource
    ){}
    async findByEmail(email: string) {
        return this.usersRepository.findOne({
          where: { email },
          select: ['id', 'email', 'password'],
        });
      }

    async postUsers(email: string, nickname: string , password: string) {
        const queryRunner = this.dataSourece.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const user = await this.usersRepository.findOne({ where: { email }});
        if (user) {
            throw new UnauthorizedException('이미 존재하는 사용자 입니다');
        }
        const hashedPassword = await bcrypt.hash(password,10);
        try{
            const returned = await queryRunner.manager.getRepository(Users).save({ 
                email,
                nickname,
                password: hashedPassword,
            });
            await  queryRunner.manager.getRepository(WorkspaceMembers).save({
                UserId: returned.id,
                WorkspaceId: 1,
            });
            await  queryRunner.manager.getRepository(ChannelMembers).save({
                UserId: returned.id,
                ChannelId: 1,
            });
            await queryRunner.commitTransaction();
            return true;

        }catch(error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }
}
