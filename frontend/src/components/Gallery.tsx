import { useState } from "react";
import { useDataContext } from "../contexts/DataContextProvider";
import Post from "./Post";

const Gallery = () => {
    const { imageData } = useDataContext();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
        null
    );

    // const handleKeyDown = useCallback(
    //     (event: KeyboardEvent) => {
    //         if (event.key === "Escape") {
    //             setIsModalOpen(false);
    //             setCurrentImageIndex(null);
    //         } else if (event.key === "ArrowLeft") {
    //             // console.log("currentImageIndex", currentImageIndex);
    //             if (currentImageIndex !== null && currentImageIndex > 0) {
    //                 setCurrentImageIndex(currentImageIndex - 1);
    //             }
    //         } else if (event.key === "ArrowRight") {
    //             // console.log("currentImageIndex", currentImageIndex);
    //             if (
    //                 currentImageIndex !== null &&
    //                 currentImageIndex < imageData.length - 1
    //             ) {
    //                 setCurrentImageIndex(currentImageIndex + 1);
    //             }
    //         }
    //     },
    //     [currentImageIndex]
    // );

    // useEffect(() => {
    //     window.addEventListener("keydown", handleKeyDown);
    //     return () => {
    //         window.removeEventListener("keydown", handleKeyDown);
    //     };
    // }, [handleKeyDown]);

    const openModal = (index: number) => {
        console.log("Opening modal for index:", index);
        setCurrentImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentImageIndex(null);
    };

    const handlePrevClick = () => {
        if (currentImageIndex !== null && currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    const handleNextClick = () => {
        if (
            currentImageIndex !== null &&
            currentImageIndex < imageData.length - 1
        ) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };
    return (
        <>
            <div className="container-border bg-indigo-200 mt-10 max-w-7xl min-h-200">
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 justify-center place-items-center p-6">
                    {imageData.map((item, index) => (
                        <div key={item.id} onClick={() => openModal(index)}>
                            <Post data={item} />
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && currentImageIndex !== null && (
                <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 ">
                    <div className="border-2 bg-white p-4 rounded-lg max-w-xl w-full">
                        <div className="flex justify-end mb-4">
                            <button
                                className="button w-12 h-12 flex items-center justify-center"
                                onClick={closeModal}
                            >
                                X
                            </button>
                        </div>

                        <img
                            src={imageData[currentImageIndex].imageUrl}
                            alt="Gallery"
                            className="container-border w-full h-auto rounded-lg"
                        />

                        <div className="flex justify-between mt-4">
                            <h2 className="text-xl font-bold">
                                User {imageData[currentImageIndex].authorId}'s
                                Sketch {imageData[currentImageIndex].id}
                            </h2>
                            <h2 className="text-lg font-semibold">
                                Date of Creation{" "}
                                {new Date(
                                    imageData[currentImageIndex].createdAt
                                ).toLocaleDateString("en-US", {})}
                            </h2>
                        </div>

                        <div className="flex justify-between mt-4">
                            <button
                                className="button w-16 disabled:opacity-50"
                                onClick={handlePrevClick}
                                disabled={currentImageIndex === 0}
                            >
                                {"<----"}
                            </button>
                            <button
                                className="button w-16 disabled:opacity-50"
                                onClick={handleNextClick}
                                disabled={
                                    currentImageIndex === imageData.length - 1
                                }
                            >
                                {"---->"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Gallery;
