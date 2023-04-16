import React from 'react';
import classNames from 'classnames';
import { Avatar } from '@/components/Avatar';
import { IPerson } from '@/models/IPerson';
import { BlackLink } from '@/components/Link';
import { PersonDescription } from './PersonDescription';
import styles from './PersonCard.module.css';

interface PersonCardProps {
  className?: string;
  person: IPerson;
  page: number;
}

export const PersonCard = ({ className, person, page }: PersonCardProps): JSX.Element => (
  <div className={classNames(styles.wrapper, className)}>
    <Avatar className={styles.avatar} value={person.name} />
    <BlackLink
      className={classNames('h5', styles.title)}
      href={`/person/${person.id}${page ? `?page=${page}` : ''}`}
    >
      {person.name}
    </BlackLink>
    <PersonDescription className={styles.description} person={person} />
  </div>
);
