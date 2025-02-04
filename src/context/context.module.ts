import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ContextMiddleware } from './context.middleware';

@Module({
  providers: [ContextMiddleware],
  exports: [ContextMiddleware],
})
export class ContextModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(ContextMiddleware).forRoutes('*');
  }
}