import { useEffect, useRef, useState } from "react";

import { useForm } from "@tanstack/react-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FieldInfo } from "./FieldInfo";
import { createPostSchema } from "@shared/types";
import { Slider } from "../ui/slider";

export function CanvasUploadForm({
    onSubmit,
}: {
    onSubmit: (caption: string, picture: File) => Promise<void>;
}) {
    // background color needs implementation but low priority
    // const [canvasColor, setCanvasColor] = useState<string>("#FFFFFF");
    const [strokeWidth, setStrokeWidth] = useState(15);
    const [strokeColor, setStrokeColor] = useState("#000000");
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [restoreArray, setRestoreArray] = useState<ImageData[]>([]);

    const form = useForm({
        validators: { onSubmit: createPostSchema },
        defaultValues: { caption: "", picture: null as File | null },
        onSubmit: async ({ value }) => {
            if (!value.picture) throw new Error("You must upload an image!");
            await onSubmit(value.caption, value.picture);
        },
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");
        if (!context) return;

        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);

        contextRef.current = context;
    }, []);

    function getX(
        event:
            | React.MouseEvent<HTMLCanvasElement>
            | React.TouchEvent<HTMLCanvasElement>
    ) {
        const canvas = canvasRef.current;
        if (!canvas) return 0;
        const rect = canvas.getBoundingClientRect();

        let clientX: number;

        if ("touches" in event) {
            clientX = event.touches[0].clientX;
        } else {
            clientX = event.nativeEvent.clientX;
        }

        // get the x for the actual canvas
        // normalize the x with rect.width to see how relative it is 100px/800 = 1/8
        // scale that to our 800px
        return ((clientX - rect.left) / rect.width) * canvas.width;
    }

    function getY(
        event:
            | React.MouseEvent<HTMLCanvasElement>
            | React.TouchEvent<HTMLCanvasElement>
    ) {
        const canvas = canvasRef.current;
        if (!canvas) return 0;
        const rect = canvas.getBoundingClientRect();

        let clientY: number;

        if ("touches" in event) {
            clientY = event.touches[0].clientY;
        } else {
            clientY = event.nativeEvent.clientY;
        }
        return ((clientY - rect.top) / rect.height) * canvas.height;
    }

    // Mouse Down / Touch Start
    function handleStart(
        event:
            | React.MouseEvent<HTMLCanvasElement>
            | React.TouchEvent<HTMLCanvasElement>
    ) {
        const context = contextRef.current;
        if (!context) return;
        setIsDrawing(true);
        context.beginPath();
        context.moveTo(getX(event), getY(event));
        event.preventDefault();
    }
    // Mouse Move / Touch Move
    function handleMove(
        event:
            | React.MouseEvent<HTMLCanvasElement>
            | React.TouchEvent<HTMLCanvasElement>
    ) {
        const context = event.currentTarget.getContext("2d");
        if (!context) return;
        if (!isDrawing) return;
        context.lineTo(getX(event), getY(event));
        context.strokeStyle = strokeColor;
        context.lineWidth = strokeWidth;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
        event.preventDefault();
    }
    // Mouse Up / Touch End
    function handleEnd(
        event:
            | React.MouseEvent<HTMLCanvasElement>
            | React.TouchEvent<HTMLCanvasElement>
    ) {
        const context = contextRef.current;
        if (!context) return;
        if (!isDrawing) return;
        context.stroke();
        context.closePath();
        setIsDrawing(false);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const snapshot = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        );
        setRestoreArray((prev) => [...prev, snapshot]);
        event.preventDefault();
    }

    function handleClear() {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = contextRef.current;
        if (!context) return;

        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);

        setRestoreArray([]);
    }

    function handleUndo() {
        if (restoreArray.length === 0) {
            handleClear();
            return;
        }

        const newRestore = restoreArray.slice(0, -1);

        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = contextRef.current;
        if (!context) return;

        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);

        const lastSnapshot = newRestore[newRestore.length - 1];
        if (lastSnapshot) {
            context.putImageData(lastSnapshot, 0, 0);
        }

        setRestoreArray(newRestore);
    }

    function handleSubmit() {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.toBlob((blob) => {
            if (blob) {
                const file = new File([blob], "image.png", {
                    type: "image/png",
                });
                form.setFieldValue("picture", file);
                form.handleSubmit();
            }
        });
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
        >
            <div className="grid grid-cols-1 gap-4">
                <form.Field name="caption">
                    {(field) => (
                        <>
                            <Label htmlFor={field.name}>Caption</Label>
                            <Input
                                id={field.name}
                                type="text"
                                placeholder="Caption"
                                value={field.state.value}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                            />
                            <FieldInfo field={field} />
                        </>
                    )}
                </form.Field>

                <form.Field name="picture">
                    {(field) => (
                        <>
                            <div>
                                <div className="border-2">
                                    {/* <Label htmlFor={field.name}></Label> */}
                                    <canvas
                                        id={field.name}
                                        ref={canvasRef}
                                        height={800}
                                        width={800}
                                        className="w-full touch-none"
                                        onTouchStart={handleStart}
                                        onTouchMove={handleMove}
                                        onTouchEnd={handleEnd}
                                        onMouseDown={handleStart}
                                        onMouseMove={handleMove}
                                        onMouseUp={handleEnd}
                                        onMouseOut={handleEnd}
                                    ></canvas>
                                </div>

                                <div className="flex flex-wrap items-center gap-6 justify-center">
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            onClick={handleUndo}
                                        >
                                            Undo
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={handleClear}
                                        >
                                            Clear
                                        </Button>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <label
                                            htmlFor="strokeColor"
                                            className="text-sm mb-1"
                                        >
                                            Stroke Color
                                        </label>
                                        <Input
                                            id="strokeColor"
                                            type="color"
                                            value={strokeColor}
                                            onChange={(e) =>
                                                setStrokeColor(e.target.value)
                                            }
                                            className=""
                                        />
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <label
                                            htmlFor="strokeWidth"
                                            className="text-sm mb-1"
                                        >
                                            Stroke Width: {strokeWidth}
                                        </label>
                                        {/* <input
                                            type="range"
                                            id="strokeWidth"
                                            min="1"
                                            max="50"
                                            value={strokeWidth}
                                            onChange={(e) =>
                                                setStrokeWidth(
                                                    Number(e.target.value)
                                                )
                                            }
                                            className="w-sm"
                                        /> */}
                                        <Slider
                                            id="strokeWidth"
                                            min={1}
                                            max={50}
                                            defaultValue={[strokeWidth]}
                                            onValueChange={(val) =>
                                                setStrokeWidth(val[0])
                                            }
                                            className="w-sm"
                                        />
                                    </div>

                                    <form.Subscribe
                                        selector={(s) => [
                                            s.canSubmit,
                                            s.isSubmitting,
                                        ]}
                                    >
                                        {([canSubmit, isSubmitting]) => (
                                            <Button
                                                type="submit"
                                                disabled={!canSubmit}
                                            >
                                                {isSubmitting
                                                    ? "..."
                                                    : "Submit"}
                                            </Button>
                                        )}
                                    </form.Subscribe>
                                </div>
                            </div>

                            {/* <FieldInfo field={field} /> */}
                        </>
                    )}
                </form.Field>
            </div>
        </form>
    );
}
