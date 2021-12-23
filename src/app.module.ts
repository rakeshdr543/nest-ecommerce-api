import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { User } from './shared/Entities/user.entity';
import { PostModule } from './post/post.module';
import { Post } from './shared/Entities/post.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get('MONGO_URI'),
        synchronize: true,
        useUnifiedTopology: true,
        entities: [User, Post],
      }),
    }),
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
