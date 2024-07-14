import { messageSuccess } from "@/components/message";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { signin as signinAction } from "./authSlice";

export const authThunks = {
  signup: createAsyncThunk(
    "auth/signup",
    async (
      values: { name: string; email: string; password: string },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`,
          values
        );
        if (data.success) {
          messageSuccess(data.message);
          window.location.href = "/auth/sign-in";
          return true;
        }
      } catch (error: any) {
        console.error("Error signing up:", error.response.data.message);
        return rejectWithValue("Error signing up, please try again");
      }
    }
  ),

  signin: createAsyncThunk(
    "auth/signin",
    async (
      values: { email: string; password: string },
      { rejectWithValue, dispatch }
    ) => {
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
          values
        );
        if (data.success) {
          dispatch(signinAction({ user: data.user }));
          messageSuccess(data.message);
          const { token } = data;
          document.cookie = `auth=${token}; path=/;`;
          window.location.href = "/dashboard";
          return data.user;
        }
      } catch (error: any) {
        console.error("Error signing in:", error.response.data.message);
        return rejectWithValue("Error signing in, please try again!");
      }
    }
  ),

  signout: createAsyncThunk(
    "auth/signout",
    async (_, { rejectWithValue, dispatch }) => {
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-out`
        );
        if (data.success) {
          return true;
        }
      } catch (error: any) {
        console.error("Error logging out:", error.response.data.message);
        return rejectWithValue("Error logging out, please try again!");
      }
    }
  ),
};
