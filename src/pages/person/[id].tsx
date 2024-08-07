import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Card, Stack } from 'react-bootstrap';
import { PERSON_LIST_ROUTE } from '@/constants';
import { PageNavbar, PageNavbarLink } from '@/components/PageNavbar';
import { PageContainer } from '@/components/PageContainer';
import { PersonForm, PersonFormPlaceholder } from '@/components/PersonForm';
import { CommentForm } from '@/components/CommentForm';
import { CommentList } from '@/components/CommentList';
import { IPerson } from '@/models/IPerson';
import { IRawComment } from '@/models/IComment';
import { wrapper } from '@/store';
import {
  getPerson,
  getRunningQueriesThunk,
  useAddPersonCommentMutation,
  useGetPersonCommentsQuery,
  useGetPersonQuery,
  useUpdatePersonMutation,
} from '@/store/apiSlice';
import { getRouterUrl } from '@/utils/router';
import { isString } from '@/utils/string';
import { toNumber } from '@/utils/number';

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
  const id = query.id as string;
  const page = toNumber(query.page) !== 1 ? toNumber(query.page) : undefined;

  const { data: person, isLoading: isPersonLoading } = useGetPersonQuery(id, {
    skip: !isReady || !id,
  });

  const { data: comments } = useGetPersonCommentsQuery(id, {
    skip: !person,
  });

  const [updatePerson, { isLoading: isPersonSaving }] =
    useUpdatePersonMutation();
  const [addPersonComment, { isLoading: isCommentAdding }] =
    useAddPersonCommentMutation();

  const backLink = useMemo(
    () => getRouterUrl(PERSON_LIST_ROUTE, { page }),
    [page]
  );

  const handlePersonSave = async (patch: IPerson) => {
    await updatePerson({ id, patch });
    push(getRouterUrl(PERSON_LIST_ROUTE, { page, highlighting: id }));
  };

  const handleCommentSave = async (comment: IRawComment) => {
    if (person) {
      addPersonComment({ id: person.id, comment });
    }
  };

  return (
    <>
      <PageNavbar>
        <PageNavbarLink href={backLink}>← Back</PageNavbarLink>
      </PageNavbar>
      <PageContainer lg={{ span: 8, offset: 2 }} xl={{ span: 6, offset: 3 }}>
        {!isReady || isPersonLoading ? (
          <PersonFormPlaceholder />
        ) : !person ? (
          <span>Invalid link</span>
        ) : (
          <Stack gap={5}>
            <PersonForm
              value={person}
              disabled={isPersonSaving}
              onSave={handlePersonSave}
              onClose={() => push(backLink)}
            />
            <Card>
              {<Card.Header>Add comment</Card.Header>}
              <Card.Body>
                <CommentForm
                  disabled={isCommentAdding}
                  onSave={handleCommentSave}
                />
              </Card.Body>
            </Card>
            {comments && <CommentList comments={comments} />}
          </Stack>
        )}
      </PageContainer>
    </>
  );
}
