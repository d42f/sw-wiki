import { IFormField } from '@/models/IForm';
import { EPersonGender } from '@/models/IPerson';

export const FIELDS: IFormField[] = [
  {
    id: 'name',
    label: 'Name',
    placeholder: 'Enter name',
    required: true,
  },
  {
    id: 'gender',
    type: 'select',
    label: 'Gender',
    placeholder: 'Select gender',
    options: Object.entries(EPersonGender).map(([label, value]) => ({
      value,
      label,
    })),
  },
  {
    id: 'birth_year',
    label: 'Birth year',
    placeholder: 'Enter birth year',
  },
  {
    id: 'hair_color',
    label: 'Hair color',
    placeholder: 'Enter hair color',
  },
  {
    id: 'skin_color',
    label: 'Skin color',
    placeholder: 'Enter skin color',
  },
  {
    id: 'height',
    type: 'number',
    label: 'Height',
    placeholder: 'Enter height',
    size: 4,
  },
  {
    id: 'mass',
    type: 'number',
    label: 'Mass',
    placeholder: 'Enter mass',
    size: 4,
  },
];
