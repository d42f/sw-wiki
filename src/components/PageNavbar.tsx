import React, { ReactNode } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Link from 'next/link';

const NavbarBrand = (props: Parameters<typeof Navbar.Brand>[0]): JSX.Element => (
  <Navbar.Brand as={Link} {...props} />
);

interface PageNavbarProps {
  className?: string;
  children?: ReactNode;
}

export const PageNavbar = ({ className, children }: PageNavbarProps): JSX.Element => (
  <Navbar className={className} bg="dark" variant="dark">
    <Container>
      <NavbarBrand href="/">
        SW Wiki
      </NavbarBrand>
      {children && (
        <Nav className="me-auto">
          {children}
        </Nav>
      )}
    </Container>
  </Navbar>
);

export const PageNavbarLink = (props: Parameters<typeof Nav.Link>[0]): JSX.Element => (
  <Nav.Link as={Link} {...props} />
);
