// Fichero de configuración de la aplicación en modo Mysql.

import { AnimalMySqlRepo } from './models/animals.mysql.repository';

const model = new AnimalMySqlRepo();

function create(data: Omit<Animal, 'id'>): void {
  const q =
    'INSERT INTO public."Animals" (name, engname, sciname, diet, lifestyle, location, slogan, animalgroup, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
  const result = await this.connection.query<Animal>(q, [
    data.name,
    data.englishName,
    data.sciName,
    data.diet,
    data.lifestyle,
    data.location,
    data.slogan,
    data.group,
    data.image,
  ]);
  const rows = result.rows;
  console.log(rows);
  return rows[0];
}
