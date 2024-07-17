import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { PERSON_LIST_ROUTE } from '@/constants';
import { PageNavbar, PageNavbarLink } from '@/components/PageNavbar';
import { PageContainer } from '@/components/PageContainer';
import { PersonForm } from '@/components/PersonForm';
import { IPerson } from '@/models/IPerson';
import { wrapper } from '@/store';
import {
  getPerson,
  getRunningQueriesThunk,
  useGetPersonQuery,
  useUpdatePersonMutation,
} from '@/store/apiSlice';
import { getRouterUrl } from '@/utils/router';
import { isString } from '@/utils/string';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.query.id;
    if (isString(id)) {
      store.dispatch(getPerson.initiate(id));
    }
    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return { props: {} };
  }
);

export default function Person() {
  const { isReady, query, push } = useRouter();
  const id = (query.id || '').toString();
  const page = (query.page || '').toString();
  const { data: person, isLoading } = useGetPersonQuery(id, {
    skip: !isReady || !id,
  });
  const [updatePerson] = useUpdatePersonMutation();

  const backLink = useMemo(
    () => getRouterUrl(PERSON_LIST_ROUTE, { page }),
    [page]
  );

  const handleSave = async (patch: IPerson) => {
    await updatePerson({ id, patch });
    push(getRouterUrl(PERSON_LIST_ROUTE, { page, highlighting: id }));
  };

  return (
    <>
      <PageNavbar>
        <PageNavbarLink href={backLink}>← Back</PageNavbarLink>
      </PageNavbar>
      <PageContainer lg={{ span: 8, offset: 2 }} xl={{ span: 6, offset: 3 }}>
        {!isReady || isLoading ? (
          <span>Loading...</span>
        ) : !person ? (
          <span>Invalid link</span>
        ) : (
          <PersonForm
            value={person}
            onSave={handleSave}
            onClose={() => push(backLink)}
          />
        )}
      </PageContainer>
    </>
  );
}
