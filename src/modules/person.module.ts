import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModel } from '../models/person.model';
import { PersonController } from '../controllers/person.controller';

@Module({
    imports: [TypeOrmModule.forFeature([PersonModel], 'db1_connection')],
    controllers: [PersonController],
    providers: [],
})
export class PersonModule {}
