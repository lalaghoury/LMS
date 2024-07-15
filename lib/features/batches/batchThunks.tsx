import { messageSuccess } from "@/components/message";
import { getABatchById } from "@/helpers/get-batch";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const batchThunks = {
  createBatch: createAsyncThunk(
    "batches/createBatch",
    async (
      values: {
        name: string;
        description: string;
        room: string;
        section: string;
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
          window.location.href = `/dashboard/batches/${data.batch._id}`;
          return data.batch;
        }
      } catch (error: any) {
        console.error("Error Creating Batch:", error.response.data.message);
        return rejectWithValue("Error Creating Batch, please try again!");
      }
    }
  ),
  getAllBatches: createAsyncThunk(
    "batches/getAllBatches",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/batches/all`
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
  editBatch: createAsyncThunk(
    "batches/editBatch",
    async (
      { values, id }: { values: object; id: string },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/batches/update/${id}`,
          values
        );
        if (data.success) {
          messageSuccess(data.message);
          window.location.href = "/dashboard/batches";
          return data.batch;
        }
      } catch (error: any) {
        console.error("Error Editing Batch:", error.response.data.message);
        return rejectWithValue("Error Editing Batch, please try again!");
      }
    }
  ),
  deleteBatch: createAsyncThunk(
    "batches/deleteBatch",
    async (id: string, { rejectWithValue }) => {
      try {
        const { data } = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/batches/delete/${id}`
        );
        if (data.success) {
          messageSuccess(data.message);
          return true;
        }
      } catch (error: any) {
        console.error("Error Deleting Batch:", error.response.data.message);
        return rejectWithValue("Error Deleting Batch, please try again!");
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
        console.error("Error Deleting Batch:", error.response.data.message);
        return rejectWithValue("Error Deleting Batch, please try again!");
      }
    }
  ),
};
