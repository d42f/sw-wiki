import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PAGES_LIMIT, PAGES_START } from '@/constants';
import { PageNavbar } from '@/components/PageNavbar';
import { PageContainer } from '@/components/PageContainer';
import { PersonList, PersonListPlaceholder } from '@/components/PersonList';
import {
  getPersonList,
  getRunningQueriesThunk,
  useGetPersonListQuery,
} from '@/store/apiSlice';
import { wrapper } from '@/store';
import { toNumber } from '@/utils/number';
import { getRouterUrl } from '@/utils/router';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const page = toNumber(context.query.page) || PAGES_START;
    store.dispatch(getPersonList.initiate(page));
    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return { props: {} };
  }
);

export default function Index() {
  const { isFallback, isReady, route, query, replace } = useRouter();
  const page = toNumber(query.page) || PAGES_START;
  const { data: personList, isFetching } = useGetPersonListQuery(page, {
    skip: !isReady || isFallback,
  });

  useEffect(() => {
    if (query.highlighting) {
      replace(
        getRouterUrl(route, { ...query, highlighting: undefined }),
        undefined,
        { shallow: true }
      );
    }
  }, [route, query, replace]);

  return (
    <>
      <PageNavbar />
      <PageContainer lg={{ span: 10, offset: 1 }} xl={{ span: 8, offset: 2 }}>
        {!isReady || isFallback || isFetching ? (
          <PersonListPlaceholder cards={4} />
        ) : !personList?.results.length ? (
          <span>No data</span>
        ) : (
          <PersonList
            personList={personList}
            currentPage={page}
            limit={PAGES_LIMIT}
            highlightId={query.highlighting as string}
          />
        )}
      </PageContainer>
    </>
  );
}
