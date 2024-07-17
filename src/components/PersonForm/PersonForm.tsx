import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { IPerson } from '@/models/IPerson';
import { FIELDS } from './constants';
import styles from './PersonForm.module.css';

interface PersonFormProps {
  className?: string;
  value: IPerson;
  onSave: (value: IPerson) => void;
  onClose: () => void;
}

export const PersonForm = ({
  className,
  value,
  onSave,
  onClose,
}: PersonFormProps): JSX.Element => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IPerson>({ defaultValues: value });

  return (
    <Form
      className={classNames(styles.form, className)}
      onSubmit={handleSubmit((data) => onSave(data))}
    >
      <h2 className={styles.title}>{value.name}</h2>
      {FIELDS.map(
        ({
          id,
          type = 'text',
          label,
          placeholder,
          required = false,
          options = [],
          size = 10,
        }) => (
          <Form.Group key={id} as={Row}>
            <Form.Label column sm={2}>
              {label}
            </Form.Label>
            <Col sm={size}>
              {['text', 'number'].includes(type) ? (
                <Form.Control
                  role={id}
                  type={type}
                  placeholder={placeholder}
                  isInvalid={!!errors[id]}
                  {...register(id, {
                    required,
                    valueAsNumber: type === 'number',
                  })}
                />
              ) : type === 'select' ? (
                <Form.Select role={id} {...register(id)}>
                  {options.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
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
        )
      )}

      <div className={styles.footer}>
        <Button variant="primary" type="submit" role="submit">
          Save
        </Button>
        <Button variant="light" type="button" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};
