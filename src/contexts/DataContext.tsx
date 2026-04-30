import React, { createContext, useContext, useState, useEffect } from 'react';
import { COURSES as initialCourses, PRODUCTS as initialProducts } from '../constants';
import { Course, Product } from '../types';

interface DataContextType {
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('courses_v6');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products_v5');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('courses_v6', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('products_v5', JSON.stringify(products));
  }, [products]);

  return (
    <DataContext.Provider value={{ courses, setCourses, products, setProducts }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
