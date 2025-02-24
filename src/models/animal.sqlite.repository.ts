import { Animal } from './animal.type.js';
import { Repository } from './repository.type.js';
import { dirname, resolve } from 'path';
import sqlite3 from 'sqlite3';
import { mkdir, access, writeFile } from 'fs/promises';
import { CustomPromisify, promisify } from 'util';

export class AnimalSqliteRepo implements Repository<Animal> {
  database!: sqlite3.Database;

  const = new CustomPromisify();
  // Espacio de Nombres
  SQL = {
    all: promisify(this.database.all.bind(this.database)),
    get: promisify(this.database.get.bind(this.database)),
    run: promisify(this.database.run.bind(this.database)),
  };

  constructor() {}

  initializeSQLITE = async (relativeFilePath: string) => {
    const filePath = resolve(relativeFilePath);
    const folder = dirname(filePath);
    const info = [];
    try {
      await access(folder);
    } catch (error) {
      const errorFolder = error as Error;
      if (errorFolder.message.includes('no such file or directory')) {
        info.push('Folder does not exist');
        mkdir(folder, { recursive: true });
        info.push(folder);
      } else {
        console.error(errorFolder.message);
        throw errorFolder;
      }
    }
    try {
      await access(filePath);
      info.push('File already exists');
    } catch (error) {
      const errorFile = error as Error;
      if (errorFile.message.includes('no such file or directory')) {
        info.push('File does not exist');
        await writeFile(filePath, '', 'utf-8');
        info.push('File initialized');
      } else {
        console.error(errorFile.message);
        throw errorFile;
      }
    }
    //this.#filePath = filePath;
    info.push(`Initialized DB at`);
    info.push(filePath);
    return info;
  };

  async connectDB(file: string) {
    const dbfile = process.env.DB_FILE;

    // conexión
    this.database = new sqlite3.Database(file);
  }

  async read(): Promise<Animal[]> {
    const q = 'SELECT * FROM public."Animals" ORDER BY id ASC ';
    const data: Animal[] = await this.SQL.all(q);
    console.log(data);
    return data;
  }

  async readById(id: string): Promise<Animal> {}

  async create(data: Animal): Promise<Animal> {}

  async update(
    id: string,
    data: Partial<Omit<Animal, 'id'>>,
  ): Promise<Animal> {}

  async delete(id: string): Promise<Animal> {}
}
function customPromisify(arg0: {
  <T>(
    sql: string,
    callback?:
      | ((this: sqlite3.Statement, err: Error | null, rows: T[]) => void)
      | undefined,
  ): sqlite3.Database;
  <T>(
    sql: string,
    params: any,
    callback?:
      | ((this: sqlite3.Statement, err: Error | null, rows: T[]) => void)
      | undefined,
  ): sqlite3.Database;
  (sql: string, ...params: any[]): sqlite3.Database;
}) {
  throw new Error('Function not implemented.');
}
