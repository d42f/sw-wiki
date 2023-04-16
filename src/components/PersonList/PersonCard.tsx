import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { Avatar } from '@/components/Avatar';
import { BlackLink } from '@/components/Link';
import { IPerson } from '@/models/IPerson';
import { getRouterUrl } from '@/utils/router';
import { PersonDescription } from './PersonDescription';
import styles from './PersonCard.module.css';

interface PersonCardProps {
  className?: string;
  person: IPerson;
  page: number;
}

export const PersonCard = ({ className, person, page }: PersonCardProps): JSX.Element => (
  <div className={classNames(styles.wrapper, className)}>
    <Link className={styles.logo} href={getRouterUrl(`/person/${person.id}`, { page })}>
      <Avatar className={styles.avatar} value={person.name} />
    </Link>
    <BlackLink
      className={styles.title}
      href={getRouterUrl(`/person/${person.id}`, { page })}
    >
      {person.name}
    </BlackLink>
    <PersonDescription className={styles.description} person={person} />
  </div>
);
