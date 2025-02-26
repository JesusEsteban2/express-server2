import createDebug from 'debug';
const debug = createDebug('demo:model:animal');
debug('Loaded module');

import { z } from 'zod';

export const Animal = z.object({
  id: z.string(),
  name: z.string().nonempty(),
  engname: z.string().nonempty(),
  sciname: z.string().nonempty(),
  animalgroup: z.string().nonempty(),
  image: z.string().url(),
  diet: z.string(),
  lifestyle: z.enum(['Diurno', 'Nocturno']),
  location: z.string(),
  slogan: z.string(),
});

// extract the inferred type
export type Animal = z.infer<typeof Animal>;
// {
//     id: string;
//     name: string;
//     engname: string;
//     sciname: string;
//     diet: string;
//     lifestyle: string;
//     location: string;
//     slogan: string;
//     animalgroup: string;
//     image: string;
// }

export type AnimalCreateDTO = Omit<Animal, 'id'>;

export type AnimalUpdateDTO = Partial<Omit<Animal, 'id'>>;
