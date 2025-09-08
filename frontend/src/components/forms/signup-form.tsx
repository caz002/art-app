import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "@tanstack/react-router";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { getSessionQueryOptions } from "@/lib/api";

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

export function SignUpForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
        },
        onSubmit: async ({ value }) => {
            const { data, error } = await authClient.signUp.email(
                {
                    email: value.email, // user email address
                    name: value.name,
                    password: value.password, // user password -> min 8 characters by default
                },
                {
                    onRequest: () => {
                        //show loading
                    },
                    onSuccess: () => {
                        //redirect to the dashboard or sign in page
                        queryClient.invalidateQueries({
                            queryKey: getSessionQueryOptions.queryKey,
                        });
                    },
                    onError: (ctx) => {
                        // display the error message
                        alert(ctx.error.message);
                    },
                }
            );

            if (error) {
                throw new Error(error.message);
            }

            // console.log(data.user.name);

            navigate({
                to: "/profile/$userId",
                params: { userId: data.user.id },
            });
        },
    });
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className="p-6 md:p-8"
                    >
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">
                                    Welcome to DailySketch!
                                </h1>
                                <p className="text-muted-foreground text-balance">
                                    Enter your account details to create your
                                    DailySketch account.
                                </p>
                            </div>
                            <form.Field
                                name="email"
                                children={(field) => (
                                    <div className="grid gap-3">
                                        <div className="flex items-center">
                                            <Label htmlFor={field.name}>
                                                Email
                                            </Label>
                                        </div>
                                        <Input
                                            id={field.name}
                                            type="text"
                                            onBlur={field.handleBlur}
                                            onChange={(e) => {
                                                field.handleChange(
                                                    e.target.value
                                                );
                                            }}
                                            required
                                        />
                                        <FieldInfo field={field} />
                                    </div>
                                )}
                            />
                            <form.Field
                                name="name"
                                children={(field) => (
                                    <div className="grid gap-3">
                                        <div className="flex items-center">
                                            <Label htmlFor={field.name}>
                                                Username
                                            </Label>
                                        </div>
                                        <Input
                                            id={field.name}
                                            type="text"
                                            onBlur={field.handleBlur}
                                            onChange={(e) => {
                                                field.handleChange(
                                                    e.target.value
                                                );
                                            }}
                                            required
                                        />
                                        <FieldInfo field={field} />
                                    </div>
                                )}
                            />
                            <form.Field
                                name="password"
                                children={(field) => (
                                    <div className="grid gap-3">
                                        <div className="flex items-center">
                                            <Label htmlFor={field.name}>
                                                Password
                                            </Label>
                                        </div>
                                        <Input
                                            id={field.name}
                                            type="password"
                                            onBlur={field.handleBlur}
                                            onChange={(e) => {
                                                field.handleChange(
                                                    e.target.value
                                                );
                                            }}
                                            required
                                        />
                                        <FieldInfo field={field} />
                                    </div>
                                )}
                            />
                            <form.Field
                                name="confirmPassword"
                                children={(field) => (
                                    <div className="grid gap-3">
                                        <div className="flex items-center">
                                            <Label htmlFor={field.name}>
                                                Confirm Password
                                            </Label>
                                        </div>
                                        <Input
                                            id={field.name}
                                            type="password"
                                            onBlur={field.handleBlur}
                                            onChange={(e) => {
                                                field.handleChange(
                                                    e.target.value
                                                );
                                            }}
                                            required
                                        />
                                        <FieldInfo field={field} />
                                    </div>
                                )}
                            />

                            <form.Subscribe
                                selector={(state) => [
                                    state.canSubmit,
                                    state.isSubmitting,
                                ]}
                                children={([canSubmit, isSubmitting]) => (
                                    <Button type="submit" disabled={!canSubmit}>
                                        {isSubmitting ? "..." : "Register"}
                                    </Button>
                                )}
                            />
                            <div className="text-center text-sm">
                                Already have an account?{" "}
                                <a
                                    href="/login"
                                    className="underline underline-offset-4"
                                >
                                    Login
                                </a>
                            </div>
                        </div>
                    </form>
                    <div className="bg-muted relative hidden md:block">
                        <img
                            src="/placeholder.svg"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our{" "}
                <a href="/">Terms of Service</a> and{" "}
                <a href="/">Privacy Policy</a>.
            </div>
        </div>
    );
}
