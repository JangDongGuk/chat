import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddeware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { ChannelsModule } from './channels/channels.module';
import { WorkspacesModule } from './workspaces/workspaces.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
  }),
    UsersModule,
    ChannelsModule,
    WorkspacesModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddeware).forRoutes('*');
  }
}
