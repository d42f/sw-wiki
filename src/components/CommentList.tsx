import React from 'react';
import { Card, Stack } from 'react-bootstrap';
import classNames from 'classnames';
import { IComment } from '@/models/IComment';
import { formatDateTime } from '@/utils/date';

interface CommentListProps {
  className?: string;
  comments: IComment[];
}

export const CommentList = ({
  className,
  comments,
}: CommentListProps): JSX.Element => {
  return (
    <Stack className={classNames(className)} gap={5}>
      {comments.map((comment, index) => (
        <Card key={index}>
          <Card.Header>{formatDateTime(comment.date)}</Card.Header>
          <Card.Body>{comment.text}</Card.Body>
        </Card>
      ))}
    </Stack>
  );
};
