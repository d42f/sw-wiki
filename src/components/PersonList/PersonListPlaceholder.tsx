import React, { useMemo } from 'react';
import classNames from 'classnames';
import { createArray } from '@/utils/array';
import { PersonCardPlaceholder } from './PersonCardPlaceholder';
import styles from './PersonList.module.css';

interface PersonListPlaceholderProps {
  className?: string;
  cards?: number;
}

export const PersonListPlaceholder = ({
  className,
  cards: originalCards = 3,
}: PersonListPlaceholderProps): JSX.Element => {
  const cards = useMemo(() => createArray(originalCards), [originalCards]);

  return (
    <div className={classNames(styles.wrapper, className)}>
      <ul className={styles.list}>
        {cards.map((i) => (
          <li className={styles.item} key={i}>
            <PersonCardPlaceholder />
          </li>
        ))}
      </ul>
    </div>
  );
};
