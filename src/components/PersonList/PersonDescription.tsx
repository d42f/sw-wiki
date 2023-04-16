import React from 'react';
import classNames from 'classnames';
import { IPerson } from '@/models/IPerson';
import styles from './PersonDescription.module.css';
import { Row } from 'react-bootstrap';

const KEYS: Partial<Record<keyof IPerson, string>> = {
  birth_year: 'Birth year',
  gender: 'Gender',
}

interface PersonDescriptionProps {
  className?: string;
  person: IPerson;
}

export const PersonDescription = ({ className, person }: PersonDescriptionProps): JSX.Element => (
  <div className={classNames(styles.wrapper, className)}>
    {Object.entries(KEYS).map(([key, label]) => (
      <Row key={key}>
        <dt className="col-sm-3">{label}</dt>
        <dd className="col-sm-9">{person[key as keyof IPerson].toString()}</dd>
      </Row>
    ))}
  </div>
);
