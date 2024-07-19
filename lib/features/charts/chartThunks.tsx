import { messageSuccess } from "@/components/message";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const chartThunks = {
  initialize: createAsyncThunk(
    "chart/initialize",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/batches/chart/initialize`
        );
        if (data.success) {
          messageSuccess(data.message);
          return data;
        }
      } catch (error: any) {
        console.error("Error Getting Chart Data:", error.response.data.message);
        return rejectWithValue(
          error.response.data.message ??
            "Error Getting Chart Data, please try again!"
        );
      }
    }
  ),
};
