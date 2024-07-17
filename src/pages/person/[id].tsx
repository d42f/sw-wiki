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

  const { data: person, isLoading: isPersonLoading } = useGetPersonQuery(id, {
    skip: !isReady || !id,
  });

  const { data: comments } = useGetPersonCommentsQuery(id, {
    skip: !person,
  });

  const [updatePerson] = useUpdatePersonMutation();
  const [addPersonComment, { isLoading: isCommentLoading }] =
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
        {!isReady || isPersonLoading || 1 ? (
          <PersonFormPlaceholder />
        ) : !person ? (
          <span>Invalid link</span>
        ) : (
          <Stack gap={5}>
            <PersonForm
              value={person}
              onSave={handlePersonSave}
              onClose={() => push(backLink)}
            />
            <Card>
              {<Card.Header>Add comment</Card.Header>}
              <Card.Body>
                <CommentForm
                  disabled={isCommentLoading}
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
