import React, { createContext, useContext, useState, useEffect } from "react";
import type { ImageData } from "../lib/types";

// Stores Data from backend
interface DataContextType {
    imageData: ImageData[];
    currId: number;
    setImageData: React.Dispatch<React.SetStateAction<ImageData[]>>;
    setCurrId: React.Dispatch<React.SetStateAction<number>>;
    fetchImageData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [imageData, setImageData] = useState<ImageData[]>([]);
    const [currId, setCurrId] = useState(0);

    const fetchImageData = async () => {
        fetch("http://localhost:5001/api/posts", {
            method: "GET",
        })
            .then((data) => data.json())
            .then((data) => setImageData(data));
    };

    useEffect(() => {
        fetchImageData();
    }, []);

    return (
        <DataContext.Provider
            value={{
                imageData,
                currId,
                setImageData,
                setCurrId,
                fetchImageData,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useContext must be used within a Provider");
    }
    return context;
};
