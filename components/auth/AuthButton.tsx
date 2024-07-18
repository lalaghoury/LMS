"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Icons } from "../ui/icons";
import { authThunks } from "@/lib/features/auth/authThunks";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { UserSignup } from "@/models/User";

const AuthButton = ({
  name = "",
  email,
  password,
  type,
}: {
  name?: string;
  email: string;
  password: string;
  type: "signin" | "signup";
}) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const text = {
    loadingText: type === "signin" ? "Signing in..." : "Signing up...",
    buttonText: type === "signin" ? "Sign in" : "Sign up",
  };

  const handleAuth = () => {
    if (type === "signin") {
      dispatch(authThunks.signin({ values: { email, password }, router }));
    } else if (type === "signup") {
      dispatch(
        authThunks.signup({
          values: { name, email, password },
          router,
        })
      );
    }
  };

  return (
    <>
      <Button
        className="w-full"
        onClick={() => handleAuth()}
        disabled={loading}
        type="submit"
      >
        {loading && <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />}{" "}
        {loading ? text.loadingText : text.buttonText}
      </Button>
    </>
  );
};

export default AuthButton;

export const onSubmit: SubmitHandler<UserSignup> = ({
  name,
  email,
  password,
}) => {
  if (type === "signin") {
    dispatch(authThunks.signin({ values: { email, password }, router }));
  } else if (type === "signup") {
    dispatch(
      authThunks.signup({
        values: { name, email, password },
        router,
      })
    );
  }
};
