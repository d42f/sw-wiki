import React, { useMemo } from 'react';
import classNames from 'classnames';
import { getPersonLabel } from '@/utils/person';
import styles from './Avatar.module.css';
import { IPerson } from '@/models/IPerson';

interface AvatarProps {
  className?: string;
  person: IPerson;
}

export const Avatar = ({ className, person }: AvatarProps): JSX.Element => {
  const label = useMemo(() => getPersonLabel(person), [person]);
  return <span className={classNames(styles.wrapper, className)}>{label}</span>;
};
