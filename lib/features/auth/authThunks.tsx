import { messageSuccess } from "@/components/message";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { signin as signinAction } from "./authSlice";
import Cookies from "js-cookie";

export const authThunks = {
  signup: createAsyncThunk(
    "auth/signup",
    async (
      {
        values,
        router,
      }: {
        values: { name: string; email: string; password: string };
        router: any;
      },
      { rejectWithValue, dispatch }
    ) => {
      try {
        const redirectUrl = Cookies.get("redirectUrl");

        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`,
          values
        );
        const { message, success } = data;
        if (success) {
          !redirectUrl && messageSuccess(message);
          redirectUrl &&
            dispatch(authThunks.signin({ values, router, redirectUrl }));
          !redirectUrl && router.push("/auth/sign-in");
          return true;
        }
      } catch (error: any) {
        console.error("Error signing up:", error.response.data.message);
        return rejectWithValue(
          error.response.data.message ?? "Error signing up, please try again"
        );
      }
    }
  ),

  signin: createAsyncThunk(
    "auth/signin",
    async (
      {
        values,
        router,
      }: {
        values: { email: string; password: string };
        router: any;
      },
      { rejectWithValue, dispatch }
    ) => {
      try {
        const redirectUrl = Cookies.get("redirectUrl");

        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
          values
        );

        if (data.success) {
          messageSuccess(data.message);
          dispatch(signinAction({ user: data.user }));
          Cookies.set("auth", data.token, { expires: 7, path: "" });
          router.push(redirectUrl ? redirectUrl : "/dashboard");
          return data.user;
        }
      } catch (error: any) {
        console.log("🚀 ~ error:", error)
        console.error("Error signing in:", error.response.data.message);
        return rejectWithValue(
          error.response.data.message ?? "Error signing in, please try again!"
        );
      }
    }
  ),

  signout: createAsyncThunk(
    "auth/signout",
    async (router: any, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-out`
        );
        if (data.success) {
          router.push("/auth/sign-in");
          return true;
        }
      } catch (error: any) {
        console.error("Error logging out:", error.response.data.message);
        return rejectWithValue(error.response.data.message ?? "Error logging out, please try again!");
      }
    }
  ),
};
