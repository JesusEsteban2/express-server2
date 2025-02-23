import { Connection } from 'mysql2/promise.js';
import { Animal, AnimalRows } from './animal.type.js';
import type { Repository } from './repository.type.js';

export class AnimalSqlRepo implements Repository<Animal> {
  constructor(private connection: Connection) {}

  async read(): Promise<Animal[]> {
    const q = 'SELECT * FROM public."Animals" ORDER BY id ASC ';
    const [result] = await this.connection.query<AnimalRows[]>(q);
    console.log(result);
    return result as Animal[];
  }
  async readById(id: string): Promise<Animal> {
    const q = 'SELECT * FROM public."Animals" WHERE id=?';
    const [result] = await this.connection.query<AnimalRows[]>(q, id);
    return result[0];
  }
  async create(data: Animal): Promise<Animal> {
    const q =
      'INSERT INTO public."Animals" (id, name, engname, sciname, diet, lifestyle, location, slogan, animalgroup, image) VALUES ( ?, ?, ?, ?, ?, "Diurno", ?, ?, ?, ?);';
    const [result] = await this.connection.query<AnimalRows[]>(q, data);
    console.log(result);
    return result[0];
  }
  async update(id: string, data: Partial<Omit<Animal, 'id'>>): Promise<Animal> {
    const q = 'delete from public."Animals" where id= ?';
    const values = [id, data.animalgroup];
    const [result] = await this.connection.query<AnimalRows[]>(q, values);
    return result[0];
  }
  async delete(id: string): Promise<Animal> {
    const q = 'delete from public."Animals" where id= ?';
    const [result] = await this.connection.query<AnimalRows[]>(q, id);
    return result[0];
  }
}
