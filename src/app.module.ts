import { PersonModule } from './modules/person.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        PersonModule,
        TypeOrmModule.forRoot({
            name: 'db1_connection',
            database: './db1.sql',
            type: 'sqlite',
            synchronize: true,
            entities: ['dist/**/*.model.js'],
        }),
        TypeOrmModule.forRoot({
            name: 'db2_connection',
            database: './db2.sql',
            type: 'sqlite',
            synchronize: true,
            entities: ['dist/**/*.model.js'],
        }),
    ],
})
export class AppModule {}
