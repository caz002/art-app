import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { useRef, useState } from "react";
import { Slider } from "../ui/slider";
import { useForm } from "@tanstack/react-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FieldInfo } from "./FieldInfo";
import { createPostSchema } from "@shared/types";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
    DialogFooter,
} from "../ui/dialog";
import { toast } from "sonner";

export function CanvasUploadForm({
    onSubmit,
}: {
    onSubmit: (caption: string, picture: File) => Promise<void>;
}) {
    const canvasRef = useRef<ReactSketchCanvasRef>(null);
    const [strokeWidth, setStrokeWidth] = useState(5);
    const [strokeColor, setStrokeColor] = useState("#000000");
    const [canvasColor, setCanvasColor] = useState("#ffffff");

    const form = useForm({
        defaultValues: { caption: "", picture: null as File | null },
        onSubmit: async ({ value }) => {
            const image = await canvasRef.current?.exportImage("png");
            if (!image) {
                toast("Error!");
                return;
            }

            const res = await fetch(image);
            const blob = await res.blob();
            const file = new File([blob], "canvas.png", { type: "image/png" });

            await onSubmit(value.caption, file);
        },
    });

    return (
        <form
            id="canvasForm"
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
            className="flex flex-col gap-y-4"
        >
            <form.Field name="caption">
                {(field) => (
                    <>
                        <Label htmlFor={field.name}>Caption</Label>
                        <Input
                            id={field.name}
                            type="text"
                            placeholder="Caption"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <FieldInfo field={field} />
                    </>
                )}
            </form.Field>

            <div className="flex gap-2">
                <Slider
                    defaultValue={[strokeWidth]}
                    max={20}
                    min={1}
                    step={1}
                    onValueChange={(val) => setStrokeWidth(val[0])}
                />
                <input
                    type="color"
                    value={strokeColor}
                    onChange={(e) => setStrokeColor(e.target.value)}
                />
                <input
                    type="color"
                    value={canvasColor}
                    onChange={(e) => setCanvasColor(e.target.value)}
                />
            </div>

            <div className="m-auto">
                <ReactSketchCanvas
                    width="800px"
                    height="800px"
                    ref={canvasRef}
                    strokeWidth={strokeWidth}
                    strokeColor={strokeColor}
                    canvasColor={canvasColor}
                />
            </div>

            <form.Field name="picture">
                {(field) => (
                    <>
                        <input type="hidden" />
                        <FieldInfo field={field} />
                    </>
                )}
            </form.Field>

            <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                    <Button type="submit" disabled={!canSubmit}>
                        {isSubmitting ? "..." : "Submit"}
                    </Button>
                )}
            </form.Subscribe>
        </form>
    );
}
