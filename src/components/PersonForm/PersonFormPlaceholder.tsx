import React from 'react';
import { Col, Placeholder, Row, Stack } from 'react-bootstrap';
import classNames from 'classnames';
import { FIELDS } from './constants';
import styles from './PersonForm.module.css';

interface PersonFormPlaceholderProps {
  className?: string;
}

export const PersonFormPlaceholder = ({
  className,
}: PersonFormPlaceholderProps): JSX.Element => (
  <Stack className={classNames(styles.wrapper, className)} gap={3}>
    <Placeholder className={styles.title} animation="glow">
      <Placeholder className={styles.titlePlaceholder} />
    </Placeholder>
    {FIELDS.map(({ size }, index) => (
      <Row key={index}>
        <Col sm={2}>
          <Placeholder className={styles.labelPlaceholder} />
        </Col>
        <Col sm={size}>
          <Placeholder className={styles.controlPlaceholder} />
        </Col>
      </Row>
    ))}
    <div className={styles.footer}>
      <Placeholder className={styles.buttonPlaceholder} />
    </div>
  </Stack>
);
