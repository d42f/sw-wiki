import React, { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { Pagination, PaginationItem } from '@/components/Pagination';
import { IPersonList } from '@/models/IPerson';
import { PersonCard } from './PersonCard';
import { useHighlight } from './useHighlight';
import styles from './PersonList.module.css';

const createArray = (length: number): number[] => Array.from({ length }, (_, i) => i + 1);

interface PersonListProps {
  className?: string;
  personList: IPersonList;
  currentPage: number;
  limit: number;
  highlightId: string;
}

export const PersonList = ({ className, personList, currentPage, limit, highlightId }: PersonListProps): JSX.Element => {
  const listRef = useRef<HTMLUListElement>(null);
  const { highlightingId } = useHighlight({ listRef, highlightId });

  const pages = useMemo(() => createArray(Math.ceil(personList.count / limit)), [personList.count, limit]);

  const handlePageSelect = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={classNames(styles.wrapper, className)}>
      <ul className={styles.list} ref={listRef}>
        {personList.results.map(person => (
          <li className={classNames(styles.item, person.id === highlightingId && styles.bounce)} key={person.id} data-id={person.id}>
            <PersonCard person={person} page={currentPage} />
          </li>
        ))}
      </ul>
      {pages.length > 0 && (
        <Pagination className={styles.pagination}>
          {pages.map(page => (
            <PaginationItem
              key={page}
              active={page === currentPage}
              href={page === 1 ? '' : `?page=${page}`}
              shallow={true}
              onClick={handlePageSelect}
            >
              {page}
            </PaginationItem>
          ))}
        </Pagination>
      )}
    </div>
  );
};
