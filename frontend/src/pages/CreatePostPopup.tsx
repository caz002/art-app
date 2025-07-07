import { useNavigate } from "react-router-dom";
import { useState, type FormEvent, type ChangeEvent} from "react";
import { useDataContext } from "../contexts/DataContextProvider";

export default function CreatePost(){
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>("");
  const navigate = useNavigate();
  const {imageData, setImageData} = useDataContext();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!file) return;

    const formData = new FormData()
    formData.append("postImage", file)
    formData.append("caption", caption)

    const response = await fetch("http://localhost:5001/api/posts", {
        method: "POST",
        body: formData
    });
    if (response.ok){
        setImageData([...imageData, formData]);
        navigate("/profile");
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  return (
    <form onSubmit={submit}>
      <input onChange={handleFileChange} type="file" accept="image/*" />
      <input
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        type="text"
        placeholder="Caption"
      />
      <button type="submit">Submit</button>
    </form>
  )
}
//     const [file, setFile] = useState<File | null>(null);
//     const [caption, setCaption] = useState<string>("");
//     const boxStyling = "bg-[#282828] rounded-md p-5 gap-5";
//     const navigate = useNavigate();
//     const handleSubmit = async () => {
//         try{
//             if (!file) return;
//             const formData = new FormData();
//             formData.append("postImage", file);
//             formData.append("caption", caption);

//             console.log(formData);

//             const response = await fetch("http://localhost:5000/api/posts", {
//             method: "POST",
//             headers: { 'Content-Type': 'application/json' },
//             body: formData
//             });
//             if (!response.ok) {
//                 throw new Error("The response from the network request is invalid or incomplete");
//             } else{
//                 navigate('/profile');
//             }

//         } catch (error) {
//             console.error("Error handling submit:", error);
//         }
//     }
//       const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setFile(e.target.files[0])
//     }
//   }
//     return(
//         <div className = "flex flex-col gap-5">
//             <h1>Create Post</h1>
//             <form onSubmit = {handleSubmit}>
//             <div className="flex flex-row flex-1 gap-5">
//                 <div className={`flex flex-1 h-[80vh] ${boxStyling}`}><input type="file" accept = "image/png, image/jpeg" onChange = {handleFileChange}></input></div>
//                 <div className="flex flex-col flex-1 gap-5 justify-between">
//                     <input className={`${boxStyling} text-top align-top leading-none h-[40vh]`} type="text" placeholder="Write description here..." value = {caption} onChange={(e) => setCaption(e.target.value)}>
//                     </input>
//                     <div className="flex flex-row justify-around">
//                         <button onClick = {() => navigate("/profile")}>Cancel</button>
//                         <button className = "bg-white text-[#1A1A1A] rounded-md p-2" type="submit">Save</button>
//                     </div>
//                 </div>
//             </div>
//             </form>
//         </div>
//     )
// }