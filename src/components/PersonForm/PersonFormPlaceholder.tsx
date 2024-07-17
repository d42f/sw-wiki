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
    <Row>
      <Col sm={4}>
        <Placeholder animation="glow">
          <Placeholder className={styles.imagePlaceholder} />
        </Placeholder>
      </Col>
      <Col sm={8}>
        <Stack gap={3}>
          {FIELDS.map(({ size }, index) => (
            <Row key={index}>
              <Col sm={3}>
                <Placeholder animation="glow">
                  <Placeholder className={styles.labelPlaceholder} />
                </Placeholder>
              </Col>
              <Col sm={size || 9}>
                <Placeholder animation="glow">
                  <Placeholder className={styles.controlPlaceholder} />
                </Placeholder>
              </Col>
            </Row>
          ))}
        </Stack>
      </Col>
    </Row>

    <div className={styles.footer}>
      <Placeholder className={styles.buttonPlaceholder} />
    </div>
  </Stack>
);
