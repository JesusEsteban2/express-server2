/* eslint-disable @typescript-eslint/no-unused-vars */
import mysql, { RowDataPacket } from 'mysql2/promise';
import pg, { Client } from 'pg';
import type { QueryResult } from 'pg';
import { Animal } from './animal.type';
import type { Repository } from './repository.type';

type AnimalRow = Animal & QueryResult;

export class AnimalMySqlRepo implements Repository<Animal> {
  connection!: Client;
  constructor() {
    console.log('Instanciando repo for animals');
    this.openConnection();
  }

  //   private async initializeDBs() {
  //     const createDB = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`;
  //     await this.connection.query(createDB);

  //     const useDB = `USE ${process.env.DB_NAME}`;
  //     await this.connection.query(useDB);
  //     const createTable = `CREATE TABLE IF NOT EXISTS animals (
  //             animalID BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
  //             name varchar(255) NOT null unique,
  //             englishName varchar(255) NOT null unique,
  //             sciName VARCHAR(255) NOT NULL,
  //             diet VARCHAR(255) NOT NULL,
  //             lifestyle VARCHAR(255) NOT NULL,
  //             location VARCHAR(255) NOT NULL,
  //             slogan text,
  //             bioGroup VARCHAR(255) NOT NULL,
  //             image VARCHAR(255) NOT NULL,
  //             created_at TIMESTAMP DEFAULT (NOW()),
  //             updated_at TIMESTAMP DEFAULT (NOW())
  //         )`;
  //     await this.connection.query(createTable);
  //   }

  private async openConnection() {
    const dataConnection = {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD,
      // database: process.env.DB_NAME || '',
    };
    const client = new pg.Client(dataConnection);
    this.connection = client;
    // await mysql.createConnection(dataConnection);
    console.log(
      'Connection to server:',
      this.connection.host,
      //.config.host,
      this.connection.port,
      //.config.port,
    );
    // await this.initializeDBs();
    console.log('Connection to DB:', this.connection.database);
    //.config.database);
    this.connection.connect();
  }

  async read(): Promise<Animal[]> {
    const q = 'SELECT * FROM public."Animals"';
    const result = await this.connection.query<Animal>(q);
    const rows = result.rows;
    console.log(rows);
    return rows;
  }

  async readById(id: string): Promise<Animal> {
    const q = 'SELECT * FROM public."Animals" WHERE id=$1';
    const result = await this.connection.query<Animal>(q, [id]);
    const rows = result.rows;
    console.log(rows);
    return rows[0];
  }

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
