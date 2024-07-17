import React, { useMemo, useRef } from 'react';
import classNames from 'classnames';
import { Pagination, PaginationItem } from '@/components/Pagination';
import { IPersonList } from '@/models/IPerson';
import { createArray } from '@/utils/array';
import { useHighlight } from './useHighlight';
import { PersonCard } from './PersonCard';
import styles from './PersonList.module.css';

interface PersonListProps {
  className?: string;
  personList: IPersonList;
  currentPage: number;
  limit: number;
  highlightId?: string;
}

export const PersonList = ({
  className,
  personList,
  currentPage,
  limit,
  highlightId,
}: PersonListProps): JSX.Element => {
  const listRef = useRef<HTMLUListElement>(null);
  const { highlightingId } = useHighlight({ listRef, highlightId });

  const pages = useMemo(
    () => createArray(Math.ceil(personList.count / limit)).map((i) => i + 1),
    [personList.count, limit]
  );

  const handlePageSelect = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <div className={classNames(styles.wrapper, className)}>
      <ul className={styles.list} ref={listRef}>
        {personList.results.map((person) => (
          <li
            className={classNames(
              styles.item,
              person.id === highlightingId && styles.bounce
            )}
            key={person.id}
            data-id={person.id}
          >
            <PersonCard person={person} page={currentPage} />
          </li>
        ))}
      </ul>
      {pages.length > 0 && (
        <Pagination className={styles.pagination}>
          {pages.map((page) => (
            <PaginationItem
              key={page}
              active={page === currentPage || (!currentPage && page === 1)}
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
