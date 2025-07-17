import { useRef, useState, type ChangeEvent } from "react";
import { ReactSketchCanvas, type ReactSketchCanvasRef } from "react-sketch-canvas";

interface CanvasProps {
    onClose: () => void;
}

const Canvas: React.FC<CanvasProps> = ({ onClose }) => {

    const canvasRef = useRef<ReactSketchCanvasRef>(null);

    const [strokeWidth, setStrokeWidth] = useState(5);

    const handleStrokeWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStrokeWidth(+event.target.value);
    };


    const [strokeColor, setStrokeColor] = useState("#000000");
    const [canvasColor, setCanvasColor] = useState("#ffffff");

    const handleStrokeColorChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStrokeColor(event.target.value);
    };

    const handleCanvasColorChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCanvasColor(event.target.value);
    };

    const handleUndoClick = () => {
        canvasRef.current?.undo();
    };

    const handleRedoClick = () => {
        canvasRef.current?.redo();
    };

    const handleClearClick = () => {
        canvasRef.current?.clearCanvas();
    };

    const blobFromBase64 = (base64DataUrl: string): Blob => {
    const [prefix, base64] = base64DataUrl.split(',');
    if (!base64) throw new Error("Invalid base64 data URL");

    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    const mimeMatch = prefix.match(/data:(.*);base64/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/png';

    return new Blob([byteArray], { type: mimeType });
    };

    const handleOnSubmit = async () => {
        canvasRef.current?.exportImage("png").then(async (image) => {
            // console.log(blobFromBase64(image));
            const blob = blobFromBase64(image);

            const formData = new FormData();
            formData.append("postImage", blob);

            try {
                await fetch("http://localhost:5001/api/posts", {
                    method: "POST",
                    body: formData,
                });
            // refresh here
            } catch (err) {
            console.error("Upload failed", err);
            }
        });
    }

    return (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
            <div className="bg-indigo-100 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4 ">Canvas</h2>

                    <div className="flex gap-2 align-items-center ">
                        <label htmlFor="color">Stroke color</label>
                        <input
                        type="color"
                        value={strokeColor}
                        onChange={handleStrokeColorChange}
                        />
                        <label htmlFor="color">Canvas color</label>
                        <input
                        type="color"
                        value={canvasColor}
                        onChange={handleCanvasColorChange}
                        />

                        <button
                            type="button"
                            className="button"
                            onClick={handleUndoClick}
                            >
                            Undo
                        </button>
                        <button
                            type="button"
                            className="button"
                            onClick={handleRedoClick}
                            >
                            Redo
                        </button>
                        <button
                            type="button"
                            className="button"
                            onClick={handleClearClick}
                            >
                            Clear
                        </button>
                    </div>

                    <label htmlFor="strokeWidth" className="form-label">
                        Stroke width
                        </label>
                        <input
                        type="range"
                        className="form-range"
                        min="1"
                        max="20"
                        step="1"
                        id="strokeWidth"
                        value={strokeWidth}
                        onChange={handleStrokeWidthChange}
                    />


                    <div className="w-[80vw] max-w-lg aspect-square">
                        <ReactSketchCanvas
                            ref={canvasRef}
                            width="100%"
                            height="100%"
                            strokeWidth={strokeWidth}
                            strokeColor={strokeColor}
                            canvasColor={canvasColor}
                        />
                    </div>
   
                    {/* <div onclick="change_color(this)" style="background:red" class="stroke-color"></div>
                    <div onclick="change_color(this)" style="background:blue" class="stroke-color"></div>
                    
                    <button onclick="Restore()">Undo</button>
                    <button onclick="Clear()">Clear</button>
                    
                    <input type="color" oninput="stroke_color = this.value"/>
                    <input type="range" min="1" max="100" onInput="stroke_width = this.value"></input> */}

                <button className="mt-4 button" onClick={onClose}>Close</button>
                <button className="mt-4 button" onClick={handleOnSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default Canvas;