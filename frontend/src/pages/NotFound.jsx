import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <div className="empty-state mt-5">
            <h1 className="display-1 fw-bold text-muted mb-0">404</h1>
            <h3 className="mb-4 fw-semibold">Page Not Found</h3>
            <p className="text-muted mb-4">
              The page you are looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className="btn btn-primary px-4 py-2">
              <i className="bi bi-house-door me-2"></i>
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
