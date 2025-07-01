import "../App.css"
import DefaultImage from "../images/NoImageAvaliable.png"

export function PostCard({ src }: {src: string }) {
    return (
    <>
        <img src={src}  width={250} height={250} />
    </>
    )
}