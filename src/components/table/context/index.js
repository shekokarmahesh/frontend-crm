import { createContext, useContext } from 'react';

const TableContext = createContext(null);

export function TableProvider({ children, value }) {
  return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
}

export function useTableContext() {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error('useTableContext must be used within a TableProvider');
  }

  return context;
} 