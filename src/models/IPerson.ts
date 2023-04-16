export enum PersonGender {
  Male = 'male',
  Female = 'female',
  Unknown = 'unknown',
  NotAvailable = 'n/a',
}

export interface IPerson {
  id: string;
  birth_year: string;
  eye_color: string;
  films: string[];
  gender: PersonGender;
  hair_color: string;
  height: number,
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  created: Date;
  edited: Date;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

export interface IPersonList {
  count: number;
  next: string;
  previous: string;
  results: IPerson[];
}
