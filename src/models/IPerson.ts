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
  gender: PersonGender;
  hair_color: string;
  height: number,
  mass: number;
  name: string;
  skin_color: string;
  url: string;
}

export interface IPersonList {
  count: number;
  next: string;
  previous: string;
  results: IPerson[];
}
