import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import styles from './PageContainer.module.css';

export const PageContainer = ({ className, children, ...rest }: Parameters<typeof Col>[0]): JSX.Element => (
  <Container className={className}>
    <Row>
      <Col {...rest}>
        <div className={styles.content}>
          {children}
        </div>
      </Col>
    </Row>
  </Container>
)
