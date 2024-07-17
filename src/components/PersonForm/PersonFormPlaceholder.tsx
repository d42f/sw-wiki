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
    <Placeholder className={styles.titlePlaceholder} />
    {FIELDS.map(({ size }, index) => (
      <Row key={index}>
        <Col sm={2}>
          <Placeholder animation="glow">
            <Placeholder className={styles.labelPlaceholder} />
          </Placeholder>
        </Col>
        <Col sm={size}>
          <Placeholder animation="glow">
            <Placeholder className={styles.controlPlaceholder} />
          </Placeholder>
        </Col>
      </Row>
    ))}
    <div className={styles.footer}>
      <Placeholder className={styles.buttonPlaceholder} />
    </div>
  </Stack>
);
