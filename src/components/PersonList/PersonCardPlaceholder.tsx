import React from 'react';
import { Placeholder } from 'react-bootstrap';
import classNames from 'classnames';
import styles from './PersonCard.module.css';

interface PersonCardPlaceholderProps {
  className?: string;
}

export const PersonCardPlaceholder = ({
  className,
}: PersonCardPlaceholderProps): JSX.Element => (
  <div className={classNames(styles.wrapper, className)}>
    <Placeholder className={styles.logo} animation="glow">
      <Placeholder className={styles.avatar} />
    </Placeholder>
    <Placeholder className={styles.title} animation="glow">
      <Placeholder className={styles.titlePlaceholder} />
    </Placeholder>
    <div className={styles.description}>
      <Placeholder className={styles.descriptionRowPlaceholder} />
      <Placeholder className={styles.descriptionRowPlaceholder} />
    </div>
  </div>
);
