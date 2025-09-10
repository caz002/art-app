import React from "react";
import { Label } from "@/components/ui/label";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "../ui/card";
import { UserData } from "@/lib/types";
import { api, getPostsByProfileQueryOptions } from "@/lib/api";

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
}: {
  setShowEditPopup: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  userData: UserData;
}) {
  const queryClient = useQueryClient();
  const form = useForm({
    defaultValues: {
      bio: userData?.bio ?? "",
      likes: userData?.likes ?? "",
      occupation: userData?.occupation ?? "",
    },
    onSubmit: async ({ formApi, value }) => {
      // Modify Form Data
      await mutation.mutateAsync(value);
      formApi.reset();
    },
  });
  const mutation = useMutation({
    mutationFn: async (value: {
      bio: string;
      likes: string;
      occupation: string;
    }) => {
      const res = await api.profiles[":user_id"].$put({
        param: {
          user_id: userId,
        },
        form: {
          bio: value.bio,
          likes: value.likes,
          occupation: value.occupation,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to edit profile");
      }

      const existingProfile = await queryClient.ensureQueryData(
        getPostsByProfileQueryOptions(userId)
      );
      queryClient.setQueryData(getPostsByProfileQueryOptions(userId).queryKey, {
        ...existingProfile,
        user: {
          ...existingProfile.user,
          bio: value.bio,
          likes: value.likes,
          occupation: value.occupation,
        },
      });
    },
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
