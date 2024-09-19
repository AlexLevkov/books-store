import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

const LoadingSpinner: React.FC = () => (
  <Container className="text-center mt-5">
    <Spinner animation="border" role="status" />
    <div>Loading...</div>
  </Container>
);

export default LoadingSpinner;
