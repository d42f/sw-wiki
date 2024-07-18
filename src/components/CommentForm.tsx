import React from 'react';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { IRawComment } from '@/models/IComment';
import styles from './CommentForm.module.css';

interface CommentFormProps {
  className?: string;
  title?: string;
  disabled?: boolean;
  onSave: (value: IRawComment) => void;
}

export const CommentForm = ({
  className,
  title,
  disabled,
  onSave,
}: CommentFormProps): JSX.Element => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IRawComment>();

  const handleFormSubmit = handleSubmit((data) => {
    reset();
    onSave(data);
  });

  return (
    <Form
      className={classNames(styles.form, className)}
      onSubmit={handleFormSubmit}
    >
      {title && <h4 className={styles.title}>{title}</h4>}
      <Form.Group as={Row}>
        <Form.Label htmlFor="text" column sm={2}>
          Message
        </Form.Label>
        <Col>
          <Form.Control
            id="text"
            as="textarea"
            rows={3}
            isInvalid={!!errors.text}
            disabled={disabled}
            {...register('text', {
              required: true,
            })}
          />
          {!!errors.text && (
            <Form.Control.Feedback type="invalid">
              Invalid value
            </Form.Control.Feedback>
          )}
        </Col>
      </Form.Group>
      <Stack direction="horizontal" gap={2}>
        <Button
          className="ms-auto"
          type="submit"
          disabled={disabled}
          variant="secondary"
        >
          Submit
        </Button>
      </Stack>
    </Form>
  );
};
