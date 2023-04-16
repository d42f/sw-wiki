import React, { useMemo } from 'react';
import classNames from 'classnames';
import { createArray } from '@/utils/array';
import { PersonCardPlaceholder } from './PersonCardPlaceholder';
import styles from './PersonList.module.css';

interface PersonListPlaceholderProps {
  className?: string;
}

export const PersonListPlaceholder = ({ className }: PersonListPlaceholderProps): JSX.Element => {
  const cards = useMemo(() => createArray(2), []);

  return (
    <div className={classNames(styles.wrapper, className)}>
      <ul className={styles.list}>
        {cards.map(i => (
          <li className={classNames(styles.item)} key={i}>
            <PersonCardPlaceholder />
          </li>
        ))}
      </ul>
    </div>
  );
};
