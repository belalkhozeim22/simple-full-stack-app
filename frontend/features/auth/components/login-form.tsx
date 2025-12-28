"use client";
import { Button } from "@/components/ui/button";
import {
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "@tanstack/react-form";
import { useLogin } from "../hooks/use-login.hook";
import { zodLoginFormSchema } from "../validations/login-form.zod";
import {
  Redo2Icon,
  RedoDotIcon,
  RedoIcon,
  RefreshCwIcon,
  TrashIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const LoginForm = () => {
  const { mutate: loginMutate, isPending: isLoginPending } = useLogin();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmitAsync: zodLoginFormSchema,
    },
    onSubmit({ value }) {
      loginMutate(value);
    },
  });
  return (
    <>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your credentials below to login to your account
        </CardDescription>
        <CardAction>
          <Button
            disabled={isLoginPending}
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            <RefreshCwIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <Separator />

      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Email (Identifier)
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="fulan@example.com"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="password">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      type="password"
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="********"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Field orientation="horizontal">
          <Button disabled={isLoginPending} type="submit" form="login-form">
            <Spinner
              className={cn("hidden", {
                block: isLoginPending,
              })}
            />
            {!isLoginPending && "Submit"}
          </Button>
        </Field>
      </CardFooter>
    </>
  );
};
