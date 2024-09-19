import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';

type AlertMessageProps = {
  variant: 'success' | 'danger' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
};

const AlertMessage: React.FC<AlertMessageProps> = ({
  variant,
  message,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Alert
      variant={variant}
      onClose={onClose}
      dismissible
      className="position-absolute top-0 end-0 m-3"
    >
      {message}
    </Alert>
  );
};

export default AlertMessage;
