import { useDataContext } from "../contexts/DataContextProvider";
import Post from "./Post";

const Gallery = () => {
    const { imageData } = useDataContext();

    return (
        <div className="container-border bg-indigo-200 mt-10 max-w-7xl min-h-200">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 justify-center place-items-center p-6">
                {imageData.map((item) => (
                    <Post key={item.id} data={item} />
                ))}
            </div>
        </div>
    );
};

export default Gallery;
