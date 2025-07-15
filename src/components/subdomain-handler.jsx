import React, { useEffect, useState } from 'react';
import { PublicWebsiteView } from '../sections/public/public-website-view';

// Component that detects subdomain and renders public website if applicable
export function SubdomainHandler({ children }) {
  const [isSubdomain, setIsSubdomain] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const detectSubdomain = () => {
      const hostname = window.location.hostname;
      
      // Check for localhost subdomain (development)
      if (hostname.includes('.localhost') && hostname !== 'localhost') {
        const subdomain = hostname.split('.')[0];
        // Ignore common reserved subdomains
        if (subdomain && !['www', 'api', 'admin'].includes(subdomain)) {
          setIsSubdomain(true);
          setLoading(false);
          return;
        }
      }
      
      // Check for production subdomain
      if (hostname.includes('.ahoum.com') && hostname !== 'ahoum.com' && hostname !== 'www.ahoum.com') {
        const subdomain = hostname.replace('.ahoum.com', '');
        // Ignore common reserved subdomains
        if (subdomain && !['www', 'api', 'facilitatorCRM', 'admin'].includes(subdomain)) {
          setIsSubdomain(true);
          setLoading(false);
          return;
        }
      }
      
      // Not a subdomain, render normal app
      setIsSubdomain(false);
      setLoading(false);
    };

    detectSubdomain();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }

  // If it's a subdomain, show only the public website
  if (isSubdomain) {
    return <PublicWebsiteView />;
  }

  // Otherwise, render the normal CRM app
  return children;
}
