import React, { ReactNode } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './Pagination.module.css';

interface PaginationProps {
  className?: string;
  children: ReactNode;
}

export const Pagination = ({
  className,
  children,
}: PaginationProps): JSX.Element => (
  <ul className={classNames(styles.wrapper, className)}>{children}</ul>
);

type LinkProps = Parameters<typeof Link>[0];

interface PaginationItemProps extends LinkProps {
  active: boolean;
}

export const PaginationItem = ({
  className,
  active,
  children,
  ...rest
}: PaginationItemProps): JSX.Element => (
  <li className={classNames(styles.item, className)}>
    <Link
      className={classNames(styles.link, active && styles.active)}
      {...rest}
    >
      {children}
    </Link>
  </li>
);
