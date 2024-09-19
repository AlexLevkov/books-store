import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Header: React.FC = () => (
  <Row className="mb-4">
    <Col>
      <h1 className="text-center mb-4">Bookstore Inventory Manager</h1>
    </Col>
  </Row>
);

export default Header;
