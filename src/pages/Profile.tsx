import { PostCard } from "../components/PostCard";
import { useUsernameContext } from "../contexts/UsernameContextProvider";
import { useDataContext } from "../contexts/DataContextProvider";
function Profile() {
    const { username } = useUsernameContext();
    const {imageData, setImageData, currId, setCurrId} = useDataContext();
    const handleFileSubmit = (e) =>{
        const file = e.target.files[0];
        setImageData(prev => [...prev, {id: currId, src: URL.createObjectURL(file), likes:0, comments: []}]);
        setCurrId(currId + 1);
    };
    const handleFileDelete = (id: number) =>{
        const updatedData = imageData.filter(item => item.id !== id);
        setImageData(updatedData);
    };
    return (
    <>
        <div className = "text-3xl">Profile</div>
        <div className = "text-xl">{username}</div>
        <div className = "text-3xl">Posts</div>
        <input type="file" accept = "image/png, image/jpeg" onChange={handleFileSubmit} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"/>
        <div className= "grid grid-cols-4 gap-4 bg-white outline outline-grey rounded-sm outline-2 p-4 min-w-[70vw] min-h-[70vh]">
            {imageData.map(image => <PostCard src={image.src} key = {image.id} id = {image.id} handleFileDelete={handleFileDelete}/>)}
        </div>
    </>
    )
}

export default Profile