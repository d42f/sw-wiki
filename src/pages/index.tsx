import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PageNavbar } from '@/components/PageNavbar';
import { PageContainer } from '@/components/PageContainer';
import { PersonList, PersonListPlaceholder } from '@/components/PersonList';
import { IPersonList } from '@/models/IPerson';
import { useGetPersonListQuery } from '@/store/personsSlice';
import { getRouterUrl } from '@/utils/router';

const START_PAGE = 1;
const PAGE_LIMIT = 10;

const PAGE_CONTAINER_POS = {
  lg: { span: 10, offset: 1 },
  xl: { span: 8, offset: 2 },
};

export default function Home() {
  const { route, query, replace } = useRouter();
  const currentPage = query.page && isFinite(+query.page) ? +query.page : 0;
  const { data: personList, isLoading, isFetching } = useGetPersonListQuery(currentPage || START_PAGE);

  useEffect(() => {
    if (query.highlighting) {
      replace(getRouterUrl(route, { ...query, highlighting: undefined }), undefined, { shallow: true });
    }
  }, [route, query, replace]);

  return (
    <>
      <PageNavbar />
      <PageContainer {...PAGE_CONTAINER_POS}>
      {isLoading ? (
          <PersonListPlaceholder />
        ) : !personList?.results.length ? (
          <span>No data</span>
        ) : (
          <PersonList
            personList={personList as IPersonList}
            currentPage={currentPage}
            limit={PAGE_LIMIT}
            highlightId={query.highlighting as string}
          />
        )}
      </PageContainer>
    </>
  )
}
