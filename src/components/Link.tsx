import Link from 'next/link';
import classNames from 'classnames';

export const BlackLink = ({
  className,
  ...rest
}: Parameters<typeof Link>[0]): JSX.Element => (
  <Link className={classNames('link-secondary', className)} {...rest} />
);
