"use client";

import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { googleAuth, discordAuth } from "@/helpers";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSigninSchema } from "@/models/User";
import type { UserSignin } from "@/models/User";
import { authThunks } from "@/lib/features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { messageError } from "@/components/message";

export default function SignInPage() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignin>({
    resolver: zodResolver(UserSigninSchema),
  });

  const onSubmit: SubmitHandler<UserSignin> = ({ email, password }) => {
    dispatch(
      authThunks.signin({
        values: { email, password },
        router,
      })
    );
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const errorFromQuery = searchParams.get("error");
    if (errorFromQuery) {
      messageError(errorFromQuery);
      searchParams.delete("error");
      window.history.replaceState({}, "", `?${searchParams.toString()}`);
    }
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Sign in to your account </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-6">
              <Button variant="outline" onClick={discordAuth}>
                <Icons.discord className="mr-2 h-4 w-4" />
                Discord
              </Button>
              <Button variant="outline" onClick={googleAuth}>
                <Icons.google className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <>
              {[
                { name: "email", label: "Email", type: "email" },
                { name: "password", label: "Password", type: "password" },
              ].map(
                ({
                  name,
                  label,
                  type,
                }: {
                  name: string;
                  label: string;
                  type: string;
                }) => (
                  <div className="grid gap-2" key={name}>
                    <Label htmlFor={name}>{label}</Label>
                    <Input
                      id={name}
                      type={type}
                      placeholder={`Enter your ${label.toLowerCase()}`}
                      {...register(name)}
                    />
                    {errors[name] && (
                      <p className="bg-yellow-100 text-red-500 italic px-2 py-1 rounded-md self-start">
                        {errors[name]?.message}
                      </p>
                    )}
                  </div>
                )
              )}
            </>

            <CardDescription>
              New to LMS?{" "}
              <Link
                className="font-semibold text-blue-500"
                href={"/auth/sign-up"}
              >
                Sign up
              </Link>
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled={loading} type="submit">
              {loading && (
                <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
              )}{" "}
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
