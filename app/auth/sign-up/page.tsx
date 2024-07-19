"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
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
import { UserSignupSchema } from "@/models/User";
import type { UserSignup } from "@/models/User";
import { authThunks } from "@/lib/features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignup>({
    resolver: zodResolver(UserSignupSchema),
  });

  const onSubmit: SubmitHandler<UserSignup> = ({ name, email, password }) => {
    dispatch(
      authThunks.signup({
        values: { name, email, password },
        router,
      })
    );
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const redirectUrlFromQuery = searchParams.get("redirectUrl");
    if (redirectUrlFromQuery) {
      Cookies.set("redirectUrl", redirectUrlFromQuery, {
        expires: 7,
        path: "",
      });
      searchParams.delete("redirectUrl");
      window.history.replaceState({}, "", `?${searchParams.toString()}`);
    }
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an account</CardTitle>
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

            <div className="grid gap-2" key={"name"}>
              <Label htmlFor={"name"}>{"Name"}</Label>
              <Input
                id={"name"}
                type={"text"}
                placeholder={`Enter your name`}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-500 px-2 py-1 rounded-md self-start">
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className="grid gap-2" key={"name"}>
              <Label htmlFor={"email"}>{"Email"}</Label>
              <Input
                id={"email"}
                type={"email"}
                placeholder={`Enter your email`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500 px-2 py-1 rounded-md self-start">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="grid gap-2" key={"name"}>
              <Label htmlFor={"password"}>{"Password"}</Label>
              <Input
                id={"password"}
                type={"password"}
                placeholder={`Enter your password`}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500 px-2 py-1 rounded-md self-start">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <CardDescription>
              Already have an account?{" "}
              <Link
                className="font-semibold text-blue-500"
                href={"/auth/sign-in"}
              >
                Sign in
              </Link>
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled={loading} type="submit">
              {loading && (
                <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
              )}{" "}
              {loading ? "Signing up..." : "Sign up"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
