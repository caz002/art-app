import React from "react";
import { api } from "@/lib/api";
import { Label } from "@/components/ui/label";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}
export default function EditPopup({
  setShowEditPopup,
}: {
  setShowEditPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm({
    defaultValues: {
      bio: "",
      likes: "",
      occupation: "",
    },
    // onSubmit: async ({ value }) => {
    //   const res = await fetch(`/users/${userId}`, {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(value),
    //   });

    //   if (res.ok) {
    //     alert("Information Updated!");
    //   } else {
    //     alert("Error updating user information");
    //   }
    // },
  });
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" />
      {/* Popup */}
      <div className="bg-blue-800 rounded-xl shadow-lg p-6 relative z-10 w-11/12 max-w-md">
        <button
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-800"
          onClick={() => setShowEditPopup(false)}
        >
          ✕
        </button>
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex flex-1 items-center justify-center font-bold text-4xl">
            Edit Profile
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
              setShowEditPopup(false);
            }}
            className="flex flex-1 flex-col gap-6"
          >
            <form.Field
              name="bio"
              children={(field) => (
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor={field.name}>Bio</Label>
                  </div>
                  <Input
                    id={field.name}
                    type="text"
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    defaultValue={field.name}
                    required
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            />
            <form.Field
              name="likes"
              children={(field) => (
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor={field.name}>Likes</Label>
                  </div>
                  <Input
                    id={field.name}
                    type="text"
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    defaultValue={field.name}
                    required
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            />
            <form.Field
              name="occupation"
              children={(field) => (
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor={field.name}>Occupation</Label>
                  </div>
                  <Input
                    id={field.name}
                    type="text"
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    defaultValue={field.name}
                    required
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            />
            <div className="flex flex-1 items-center justify-center">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button type="submit" disabled={!canSubmit}>
                    {isSubmitting ? "..." : "Save"}
                  </Button>
                )}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
