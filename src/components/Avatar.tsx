import React, { useMemo } from 'react';
import classNames from 'classnames';
import styles from './Avatar.module.css';

const getLabel = (value: string): string =>
  value.split(/[\s-]+/).map(w => w.charAt(0)).slice(0, 2).join('').toUpperCase();

interface AvatarProps {
  className?: string;
  value: string;
}

export const Avatar = ({ className, value }: AvatarProps): JSX.Element => {
  const label = useMemo(() => getLabel(value), [value]);
  return <span className={classNames(styles.wrapper, className)}>{label}</span>;
};
