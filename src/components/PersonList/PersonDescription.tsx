import React from 'react';
import { Row } from 'react-bootstrap';
import classNames from 'classnames';
import { IPerson } from '@/models/IPerson';
import styles from './PersonDescription.module.css';

const LABELS: Partial<Record<keyof IPerson, string>> = {
  birth_year: 'Birth year',
  gender: 'Gender',
};

interface PersonDescriptionProps {
  className?: string;
  person: IPerson;
}

export const PersonDescription = ({
  className,
  person,
}: PersonDescriptionProps): JSX.Element => (
  <div className={classNames(styles.wrapper, className)}>
    {Object.entries(LABELS).map(([key, label]) => (
      <Row className="m-0" key={key} as="dl">
        <dt className="col-sm-3">{label}</dt>
        <dd className="col-sm-9">{person[key as keyof IPerson].toString()}</dd>
      </Row>
    ))}
  </div>
);
