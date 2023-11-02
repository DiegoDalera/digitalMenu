// ProductsContext.jsx
import  { createContext, useContext } from 'react';

export const ProductsContext = createContext(null);

export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({ children, value }) => {
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
