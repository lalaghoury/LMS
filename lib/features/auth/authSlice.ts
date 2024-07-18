import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { authThunks } from "./authThunks";
import { messageError } from "@/components/message";
import Cookies from "js-cookie";

// Define a type for the slice state
interface authState {
  user: {
    name: string;
    avatar: string;
    provider: string;
    _id: string;
    email: string;
  } | null;
  isLoggedIn: boolean;
  loading: boolean;
  verified: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: authState = {
  user: {
    name: "",
    avatar: "",
    provider: "",
    _id: "",
    email: "",
  },
  isLoggedIn: false,
  loading: false,
  error: null,
  verified: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, action: PayloadAction<any>) => {
      const { user: data } = action.payload;
      const user = {
        name: data.name,
        email: data.email,
        avatar: data.avatar,
        provider: data.provider,
        _id: data._id,
      };
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user,
          isLoggedIn: true,
          verified: true,
        })
      );
      Object.assign(state, {
        user,
        isLoggedIn: true,
        verified: true,
      });
    },
    signout: (state) => {
      localStorage.removeItem("auth");
      Object.assign(state, initialState);
    },
    initializeAuthState: (state) => {
      const auth = localStorage.getItem("auth");
      if (auth) {
        const { user } = JSON.parse(auth);

        Object.assign(state, {
          user,
          isLoggedIn: true,
          verified: true,
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authThunks.signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        authThunks.signup.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          Object.assign(state, initialState);
        }
      )
      .addCase(
        authThunks.signup.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          messageError(action.payload);
        }
      )

      .addCase(authThunks.signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        authThunks.signin.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.user = action.payload;
          state.isLoggedIn = true;
          state.verified = true;
        }
      )
      .addCase(
        authThunks.signin.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          messageError(action.payload)
        }
      )

      .addCase(authThunks.signout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authThunks.signout.fulfilled, (state) => {
        state.loading = false;
        Cookies.remove("auth");
        localStorage.removeItem("auth");
        Object.assign(state, initialState);
      })
      .addCase(
        authThunks.signout.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { signin, signout, initializeAuthState } = authSlice.actions;

export default authSlice.reducer;
