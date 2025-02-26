/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
import type { QueryResult } from 'pg';
import { Animal } from './animal.type';
import type { Repository } from './repository.type';
import { a } from 'vitest/dist/chunks/suite.qtkXWc6R';

type AnimalRow = Animal & QueryResult;

export class AnimalMySqlRepo implements Repository<Animal> {
  connection!: PrismaClient;

  constructor() {
    console.log('Instanciando repo for animals');
    this.connection = new PrismaClient();
    // this.openConnection();
  }

  async read(): Promise<Animal[]> {
    const rows = await this.connection.animals.findMany();
    let animal: Animal[];
    rows.map((item) => {
      const ani: Animal = {
        id: item.animalID,
        name: item.name,
        engname: item.englishName,
        sciname: item.sciName,
        animalgroup: item.bioGroup,
        image: item.image,
        diet: item.diet,
        lifestyle: item.lifestyle === 'Diurno' ? 'Diurno' : 'Nocturno',
        location: item.location,
        slogan: item.slogan!,
      };
      animal!.push(ani);
    });
    return animal!;
  }

  async readById(id: string): Promise<Animal> {}

  async create(data: Omit<Animal, 'id'>): Promise<Animal> {
    const q =
      'INSERT INTO public."Animals" (name, engname, sciname, diet, lifestyle, location, slogan, animalgroup, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    const result = await this.connection.query<Animal>(q, [
      data.name,
      data.engname,
      data.sciname,
      data.diet,
      data.lifestyle,
      data.location,
      data.slogan,
      data.animalgroup,
      data.image,
    ]);
    const rows = result.rows;
    console.log(rows);
    return rows[0];
  }

  async update(id: string, data: Partial<Omit<Animal, 'id'>>): Promise<Animal> {
    const q =
      'UPDATE public."Animals" SET (name, engname, sciname, diet, lifestyle, location, slogan, animalgroup, image) = ($1, $2, $3, $4, $5, $6, $7, $8, $9) where id= $10 RETURNING *';
    const result = await this.connection.query<Animal>(q, [
      data.name,
      data.engname,
      data.sciname,
      data.diet,
      data.lifestyle,
      data.location,
      data.slogan,
      data.animalgroup,
      data.image,
      id,
    ]);
    const rows = result.rows;
    console.log(rows);
    return rows[0];
  }

  async delete(id: string): Promise<Animal> {
    const q = 'DELETE FROM public."Animals" WHERE id=$1 RETURNING *';
    const result = await this.connection.query<Animal>(q, [id]);
    const rows = result.rows;
    console.log(rows);
    return rows[0];
  }
}
