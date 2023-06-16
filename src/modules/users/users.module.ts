import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../../common/loggers/logger.module';
import { User } from './domain/models/users.model';
import { provideUsersRepository } from './domain/repositories/user.repository.provider';
import { UserResolver } from './http/user.resolver';
import { UsersController } from './http/users.controller';
import { UsersService } from './domain/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: true,
  }),
  BullModule.registerQueue({
    name: 'users'
  }), LoggerModule],
  controllers: [UsersController],
  providers: [UsersService, ...provideUsersRepository(), UserResolver]
})
export class UsersModule { }
