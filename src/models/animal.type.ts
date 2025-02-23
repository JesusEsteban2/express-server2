import createDebug from 'debug';
import { RowDataPacket } from 'mysql2';
const debug = createDebug('demo:model:animal');
debug('Loaded module');

import { z } from 'zod';

export const Animal = z.object({
  id: z.string(),
  name: z.string().nonempty(),
  engname: z.string(),
  sciname: z.string(),
  diet: z.string(),
  lifestyle: z.string(),
  location: z.string(),
  slogan: z.string(),
  animalgroup: z.string(),
  image: z.string().url(),
});

// extract the inferred type
export type Animal = z.infer<typeof Animal>;
// {
//     id: string;
//     name: string;
//     englishName: string;
//     sciName: string;
//     diet: string;
//     lifestyle: string;
//     location: string;
//     slogan: string;
//     group: string;
//     image: string;
// }

export type AnimalCreateDTO = Omit<Animal, 'id'>;

export type AnimalUpdateDTO = Partial<Omit<Animal, 'id'>>;

export type AnimalRows = Animal & RowDataPacket;
