import FeedItem from '../components/FeedItem/FeedItem';
import React, { useState, useEffect } from 'react';
import { checkAuthentication } from '../services/auth';

const FeedPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication(setIsAuthenticated);
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>User is authenticated.</p>
          Filter Placeholder
          <FeedItem />
          <FeedItem />
          <FeedItem />
        </div>
      ) : (
        <p>User is not authenticated.</p>
      )}
    </div>
  );
};

export default FeedPage;
