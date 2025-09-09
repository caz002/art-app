import React from "react";
import { Label } from "@/components/ui/label";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Card } from "../ui/card";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import { UserData, UserProfileData } from "@/lib/types";

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
  userId,
  userData,
  refetch,
}: {
  setShowEditPopup: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  userData: UserData;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<UserProfileData, Error>>;
}) {
  const form = useForm({
    defaultValues: {
      bio: userData?.bio ?? "",
      likes: userData?.likes ?? "",
      occupation: userData?.occupation ?? "",
    },
    onSubmit: async ({ formApi, value }) => {
      // Modify Form Data
      await mutation.mutateAsync(value);

      // Invalidating query to recheck fresh data
      await refetch();
      formApi.reset();
    },
  });
  const mutation = useMutation({
    mutationFn: async (value: {
      bio: string;
      likes: string;
      occupation: string;
    }) =>
      fetch(`/api/profiles/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userId,
          bio: value.bio,
          likes: value.likes,
          occupation: value.occupation,
        }),
      }).then((res) => res.json()),
    onSuccess: () => {
      setShowEditPopup(false);
    },
  });
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" />
      {/* Popup */}
      <Card className="shadow-lg p-6 relative z-10 w-11/12 max-w-md">
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
                    defaultValue={field.state.value}
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
                    defaultValue={field.state.value}
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
                    defaultValue={field.state.value}
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
      </Card>
    </div>
  );
}
