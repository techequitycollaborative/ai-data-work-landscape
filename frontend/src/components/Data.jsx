// Data.jsx
// This component manages the data itself, caching, and notifying parent components of changes

import { useState, useEffect, useRef } from 'react';
import DataTable from './DataTable_Simple';

function DataComponent({ initialData, onDataChange }) {
  // Cache data in sessionStorage (persists until tab closes)
  const [cachedData, setCachedData] = useState(() => {
    const cached = sessionStorage.getItem('dataTableCache');
    return cached ? JSON.parse(cached) : initialData;
  });

  const dataRef = useRef(initialData);
  const dataHash = useRef(JSON.stringify(initialData));

  useEffect(() => {
    const newHash = JSON.stringify(initialData);
    if (newHash !== dataHash.current) {
      dataHash.current = newHash;
      dataRef.current = initialData;
      setCachedData(initialData);
      sessionStorage.setItem('dataTableCache', JSON.stringify(initialData));
    }
  }, [initialData]);

  // Notify parent whenever cachedData changes
  useEffect(() => {
    if (onDataChange) {
      onDataChange(cachedData);
    }
  }, [cachedData, onDataChange]);

  return <DataTable data={cachedData} />;
}

export default DataComponent;
