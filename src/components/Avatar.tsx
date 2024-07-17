import React, { useMemo } from 'react';
import classNames from 'classnames';
import { getLabel } from '@/utils/person';
import styles from './Avatar.module.css';

interface AvatarProps {
  className?: string;
  value: string;
}

export const Avatar = ({ className, value }: AvatarProps): JSX.Element => {
  const label = useMemo(() => getLabel(value), [value]);
  return <span className={classNames(styles.wrapper, className)}>{label}</span>;
};
