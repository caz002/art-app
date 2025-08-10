import React, { createContext, useContext, useState, useEffect } from "react";
import type { ImageData } from "../lib/types";

// Stores Data from backend
interface DataContextType {
    imageData: ImageData[];
    currId: number;
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
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
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const fetchImageData = async () => {
        const url = `http://localhost:5001/api/posts`;

        const res = await fetch(url, {
            method: "GET",
        });

        const json = await res.json();

        const newPosts = json;
        // console.log(newPosts);
        setImageData(newPosts);
    };

    useEffect(() => {
        fetchImageData();
    }, []);

    return (
        <DataContext.Provider
            value={{
                imageData,
                currId,
                isLoggedIn,
                setIsLoggedIn,
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
