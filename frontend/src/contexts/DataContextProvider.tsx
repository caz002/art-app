import React, { createContext, useContext, useState, useEffect } from "react";
import type { ImageData } from "../lib/types";

// Stores Data from backend
interface DataContextType {
    imageData: ImageData[];
    currId: number;
    hasMore: boolean;
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
    const [cursorId, setCursorId] = useState<number | null>(null);
    const [hasMore, setHasMore] = useState(true);

    const fetchImageData = async () => {
        if (!hasMore) return;

        const url = cursorId
            ? `http://localhost:5001/api/posts?cursor=${cursorId}`
            : `http://localhost:5001/api/posts`;

        const res = await fetch(url, {
            method: "GET",
        });

        const json = await res.json();

        const newPosts = json;
        // console.log(newPosts);
        setImageData((prev) => [...prev, ...newPosts]);

        if (newPosts.length > 0) {
            setCursorId(newPosts[newPosts.length - 1].id);
        }

        if (newPosts.length < 12) {
            setHasMore(false);
        }
    };

    useEffect(() => {
        fetchImageData();
    }, []);

    return (
        <DataContext.Provider
            value={{
                imageData,
                currId,
                hasMore,
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
