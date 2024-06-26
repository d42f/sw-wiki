import React, { FormEvent } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { IPerson, PersonGender } from '@/models/IPerson';
import styles from './PersonForm.module.css';

interface Field {
  id: keyof IPerson;
  type?: 'text' | 'number' | 'select';
  label: string;
  placeholder: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  size?: number;
}

const FIELDS: Field[] = [
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
    options: Object.entries(PersonGender).map(([ label, value ]) => ({ value, label })),
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

interface PersonFormProps {
  className?: string;
  value: IPerson;
  onSave: (value: IPerson) => void;
  onClose: () => void;
}

export const PersonForm = ({ className, value, onSave, onClose }: PersonFormProps): JSX.Element => {
  const { register, formState: { errors }, handleSubmit } = useForm<IPerson>({ defaultValues: value });

  return (
    <Form className={className} onSubmit={handleSubmit(data => onSave(data))}>
      <h2 className={styles.title}>{value.name}</h2>
      {FIELDS.map(({ id, type = 'text', label, placeholder, required = false, options = [], size = 10 }) => (
        <Form.Group key={id} className={styles.group} as={Row}>
          <Form.Label column sm={2}>{label}</Form.Label>
          <Col sm={size}>
            {type === 'text' || type === 'number' ? (
              <Form.Control
                type={type}
                role={id}
                placeholder={placeholder}
                isInvalid={!!errors[id]}
                {...register(id, { required, valueAsNumber: type === 'number' })}
              />
            ) : type === 'select' ? (
              <Form.Select role={id} {...register(id)}>
                {options.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </Form.Select>
            ) : (
              <span>Unknown field type</span>
            )}
            {!!errors[id] && (
              <Form.Control.Feedback type="invalid">
                Invalid value
              </Form.Control.Feedback>
            )}
          </Col>
        </Form.Group>
      ))}

      <div className={styles.footer}>
        <Button variant="primary" type="submit" role="submit">Save</Button>
        <Button variant="light" type="button" onClick={onClose}>Cancel</Button>
      </div>
    </Form>
  );
};
