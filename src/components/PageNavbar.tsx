import React, { ReactNode } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Link from 'next/link';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

interface PageNavbarProps {
  className?: string;
  children?: ReactNode;
}

export const PageNavbar = ({
  className,
  children,
}: PageNavbarProps): JSX.Element => (
  <Navbar className={className} bg="dark" variant="dark">
    <Container>
      <Navbar.Brand as={Link} href="/">
        {publicRuntimeConfig.appName}
      </Navbar.Brand>
      {children && <Nav className="me-auto">{children}</Nav>}
    </Container>
  </Navbar>
);

export const PageNavbarLink = (
  props: Parameters<typeof Nav.Link>[0]
): JSX.Element => <Nav.Link as={Link} {...props} />;
