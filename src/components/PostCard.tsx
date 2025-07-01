import { Link } from "react-router-dom"
export function PostCard({ src, id, handleFileDelete}: {src: string, id: number, handleFileDelete: (id: number) => void}) {
    return (
    <>
    <div className="relative">
        <Link to={`/post/${id}`}>
        <img src={src}  width={250} height={250} />
        </Link>
        <button className="absolute top-5 left-5 w-10 h-10" onClick = {() => handleFileDelete(id)}>x</button>
    </div>
    </>
    )
}