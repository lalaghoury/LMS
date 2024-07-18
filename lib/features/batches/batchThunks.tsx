import { messageSuccess } from "@/components/message";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const batchThunks = {
  createBatch: createAsyncThunk(
    "batches/createBatch",
    async (
      {
        values,
        router,
      }: {
        values: {
          name: string;
          section: string;
          subject: string;
          room: string;
        };
        router: any;
      },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/batches/new`,
          values
        );
        if (data.success) {
          messageSuccess(data.message);
          router.push(`/dashboard/batches/teaching/${data.batch._id}`);
          return data.batch;
        }
      } catch (error: any) {
        console.error("Error Creating Batch:", error.response.data.message);
        return rejectWithValue("Error Creating Batch, please try again!");
      }
    }
  ),
  getAllBatchesAsTeacherOrOwner: createAsyncThunk(
    "batches/getAllBatchesAsTeacherOrOwner",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/batches/teaching/all`
        );
        if (data.success) {
          return data.batches;
        }
      } catch (error: any) {
        console.error("Error Getting Batches:", error.response.data.message);
        return rejectWithValue("Error Getting Batches, please try again!");
      }
    }
  ),
  getAllBatchesAsStudent: createAsyncThunk(
    "batches/getAllBatchesAsStudent",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/batches/enrolled/all`
        );
        if (data.success) {
          return data.batches;
        }
      } catch (error: any) {
        console.error("Error Getting Batches:", error.response.data.message);
        return rejectWithValue("Error Getting Batches, please try again!");
      }
    }
  ),
  getABatchById: createAsyncThunk(
    "batches/getABatchById",
    async (id: string, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/batches/get-single/${id}`
        );
        if (data.success) {
          return data.batch;
        }
      } catch (error: any) {
        console.error("Error Getting Batch:", error.response.data.message);
        return rejectWithValue(
          error.response.data.message ??
            "Error Getting Batch, please try again!"
        );
      }
    }
  ),
  joinIntoBatchByBatchCode: createAsyncThunk(
    "batches/joinIntoBatchByBatchCode",
    async (
      { code, router }: { code: string; router: any },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/batches/invitation/join/${code}`
        );
        if (data.success) {
          messageSuccess(data.message);
          router.push(`/dashboard/batches/enrolled/${data.batch._id}`);
          return data.batch;
        }
      } catch (error: any) {
        console.error("Error Joining Batch:", error.response.data.message);
        return rejectWithValue(
          error.response.data.message ??
            "Error Joining Batch, please try again!"
        );
      }
    }
  ),
  getABatchByIdAsTeacherOrOwner: createAsyncThunk(
    "batches/getABatchByIdAsTeacherOrOwner",
    async (id: string, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/batches/teaching/${id}`
        );
        if (data.success) {
          return data.batch;
        }
      } catch (error: any) {
        console.error("Error Getting Batch:", error.response.data.message);
        return rejectWithValue(
          error.response.data.message ??
            "Error Getting Batch, please try again!"
        );
      }
    }
  ),
  getABatchByIdAsStudent: createAsyncThunk(
    "batches/getABatchByIdAsStudent",
    async (id: string, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/batches/enrolled/${id}`
        );
        if (data.success) {
          return data.batch;
        }
      } catch (error: any) {
        console.error("Error Getting Batch:", error.response.data.message);
        return rejectWithValue(
          error.response.data.message ??
            "Error Getting Batch, please try again!"
        );
      }
    }
  ),
};
