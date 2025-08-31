import { useForm } from "@tanstack/react-form";
import { createPostSchema } from "@shared/types";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { FieldInfo } from "./FieldInfo";

export function FileUploadForm({
    onSubmit,
}: {
    onSubmit: (caption: string, picture: File) => Promise<void>;
}) {
    const form = useForm({
        validators: { onChange: createPostSchema },
        defaultValues: { caption: "", picture: null as File | null },
        onSubmit: async ({ value }) => {
            if (!value.picture) throw new Error("You must upload an image!");
            await onSubmit(value.caption, value.picture);
        },
    });

    return (
        <form
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

            <form.Field name="picture">
                {(field) => (
                    <>
                        <Label htmlFor={field.name}>Picture</Label>
                        <Input
                            id={field.name}
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0] ?? null;
                                field.handleChange(file);
                            }}
                        />
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
