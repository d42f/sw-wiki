import React from 'react';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { IMAGE_PLACEHOLDER_URL } from '@/constants';
import { IPerson } from '@/models/IPerson';
import { FIELDS } from './constants';
import styles from './PersonForm.module.css';
import Image from 'next/image';
import { rgbDataURL } from '@/utils/image';

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
      <Row>
        <Col sm={4}>
          <Image
            className={styles.image}
            src={`${IMAGE_PLACEHOLDER_URL}/g/215/362/star-wars?random=${value.id}`}
            blurDataURL={rgbDataURL(33, 37, 41)}
            placeholder="blur"
            priority={false}
            width={215}
            height={362}
            alt={value.name}
          />
        </Col>
        <Col sm={8}>
          <Stack gap={3}>
            {FIELDS.map(
              ({
                id,
                type = 'text',
                label,
                placeholder,
                required = false,
                options = [],
                size,
              }) => (
                <Form.Group key={id} as={Row}>
                  <Form.Label column sm={3}>
                    {label}
                  </Form.Label>
                  <Col sm={size || 9}>
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
          </Stack>
        </Col>
      </Row>

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
