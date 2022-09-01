import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonModel } from '../models/person.model';
import { Repository } from 'typeorm';
import { PersonSchema } from '../schemas/person.schema';

@Controller('/person')
export class PersonController {
    constructor(
        @InjectRepository(PersonModel, 'db1_connection')
        private model: Repository<PersonModel>
    ) {}

    @Post()
    public async create(@Body() body: PersonSchema): Promise<PersonModel> {
        return await this.model.save(body);
    }

    @Get(':id')
    public async getOne(
        @Param('id', ParseIntPipe) id: number
    ): Promise<PersonModel> {
        const person = await this.model.findOne({ where: { id } });

        if (!person) {
            throw new NotFoundException(`Pessoa de id ${id} não encontrada`);
        }

        return person;
    }

    @Get()
    public async getAll(): Promise<PersonModel[]> {
        return await this.model.find();
    }

    @Put(':id')
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: PersonSchema
    ): Promise<PersonModel> {
        const person = await this.model.findOne({ where: { id } });

        if (!person) {
            throw new NotFoundException(`Pessoa de id ${id} não encontrada`);
        }

        await this.model.update({ id }, body);
        const personUpdated = await this.model.findOne({ where: { id } });
        return personUpdated;
    }

    @Delete(':id')
    public async delete(
        @Param('id', ParseIntPipe) id: number
    ): Promise<string> {
        const person = await this.model.findOne({ where: { id } });

        if (!person) {
            throw new NotFoundException(`Pessoa de id ${id} não encontrada`);
        }

        await this.model.delete({ id });

        return `Pessoa com id ${id} deletada com sucesso!`;
    }
}
