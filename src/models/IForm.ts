import { IPerson } from './IPerson';

export interface IFormField {
  id: keyof IPerson;
  type?: 'text' | 'number' | 'select';
  label: string;
  placeholder: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  size?: number;
}
