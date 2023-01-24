import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddeware } from './middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
  })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddeware).forRoutes('*');
  }
}
