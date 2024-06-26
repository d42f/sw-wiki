import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { PageNavbar, PageNavbarLink } from '@/components/PageNavbar';
import { PageContainer } from '@/components/PageContainer';
import { PersonForm } from '@/components/PersonForm';
import { useGetPersonQuery, useUpdatePersonMutation } from '@/store/personsSlice';
import { IPerson } from '@/models/IPerson';
import { getRouterUrl } from '@/utils/router';

const LIST_ROUTE = '/';

const PAGE_CONTAINER_POS = {
  lg: { span: 8, offset: 2 },
  xl: { span: 6, offset: 3 },
};

export default function Person() {
  const { query, push } = useRouter();
  const id = (query.id || '').toString();
  const page = (query.page || '').toString();
  const { data: person, isLoading } = useGetPersonQuery(id, { skip: !id });
  const [updatePerson] = useUpdatePersonMutation();

  const backLink = useMemo(() => getRouterUrl(LIST_ROUTE, { page }), [page]);

  const handleSave = async (patch: IPerson) => {
    await updatePerson({ id, patch });
    push(getRouterUrl(LIST_ROUTE, { page, highlighting: id }));
  };

  return (
    <>
      <PageNavbar>
        <PageNavbarLink href={backLink}>
          ← Back
        </PageNavbarLink>
      </PageNavbar>
      <PageContainer {...PAGE_CONTAINER_POS}>
        {isLoading ? (
          <span>Loading...</span>
        ) : !person ? (
          <span>Invalid link</span>
        ) : (
          <PersonForm value={person} onSave={handleSave} onClose={() => push(backLink)} />
        )}
      </PageContainer>
    </>
  )
}
