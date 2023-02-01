import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddeware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { ChannelsModule } from './channels/channels.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './common/entities/Users';
import { Channels } from './common/entities/Channels';
import { ChannelMembers } from './common/entities/ChannelMembers';
import { ChannelChats } from './common/entities/Channelchats';
import { Workspaces } from './common/entities/Workspaces';
import { WorkspaceMembers } from './common/entities/WorkspaceMembers';


@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
  }),
    UsersModule,
    ChannelsModule,
    WorkspacesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        Users,
        Channels,
        ChannelMembers,
        ChannelChats,
        Workspaces,
        WorkspaceMembers
      ],
      synchronize: true,
      logging: true,
      charset: 'utf8mb4'
  }),
    TypeOrmModule.forFeature([Users])
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddeware).forRoutes('*');
  }
}
