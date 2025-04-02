
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of our context
interface ProductFilterContextType {
  selectedProduct: string;
  setSelectedProduct: (product: string) => void;
  productOptions: { value: string; label: string }[];
}

// Create the context with default values
const ProductFilterContext = createContext<ProductFilterContextType>({
  selectedProduct: 'all',
  setSelectedProduct: () => {},
  productOptions: [
    { value: "all", label: "All Products" },
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "furniture", label: "Furniture" },
    { value: "beauty", label: "Beauty & Personal Care" },
    { value: "food", label: "Food & Beverages" }
  ]
});

// Hook to use the product filter context
export const useProductFilter = () => useContext(ProductFilterContext);

interface ProductFilterProviderProps {
  children: ReactNode;
}

export const ProductFilterProvider: React.FC<ProductFilterProviderProps> = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState('all');
  
  const productOptions = [
    { value: "all", label: "All Products" },
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "furniture", label: "Furniture" },
    { value: "beauty", label: "Beauty & Personal Care" },
    { value: "food", label: "Food & Beverages" }
  ];

  return (
    <ProductFilterContext.Provider
      value={{
        selectedProduct,
        setSelectedProduct,
        productOptions,
      }}
    >
      {children}
    </ProductFilterContext.Provider>
  );
};
