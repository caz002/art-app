import React, { createContext, useContext, useState } from 'react';
import type { ImageData } from '../lib/types';

interface DataContextType {
  imageData: ImageData[],
  setImageData: React.Dispatch<React.SetStateAction<{
    id: number;
    src: string;
    likes: number;
    comments: never[];
  }[]>>,
  currId: number,
  setCurrId: React.Dispatch<React.SetStateAction<number>>,
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [imageData, setImageData] = useState<ImageData[]>([]);
  const [currId, setCurrId] = useState(0);

  return (
    <DataContext.Provider value={{ imageData, setImageData, currId, setCurrId}}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useContext must be used within a Provider');
  }
  return context;
};