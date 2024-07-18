import { messageSuccess } from "@/components/message";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const assignmentThunks = {
  createAssignment: createAsyncThunk(
    "assignments/createAssignment",
    async (
      {
        formData,
        router,
        batchId,
      }: {
        formData: {
          title: string;
          students: [];
          instructions: string;
          files: File[];
        };
        router: any;
        batchId: string;
      },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/batches/assignments/${batchId}/new`,
          formData
        );
        const { success, assignment, message } = data;
        if (success) {
          messageSuccess(message);
          router.push(
            `/dashboard/batches/${batchId}/assignments/${assignment._id}`
          );
          return assignment;
        }
      } catch (error: any) {
        console.error(
          "Error Creating Assignment:",
          error.response.data.message
        );
        return rejectWithValue(
          error.response.data.message ??
            "Error Creating Assignment, please try again!"
        );
      }
    }
  ),

  getAllAssignmentsByBatchId: createAsyncThunk(
    "assignments/getAllAssignmentsByBatchId",
    async ({ batchId }: { batchId: string }, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/batches/assignments/${batchId}/all`
        );
        const { success, assignments, message } = data;
        if (success) {
          messageSuccess(message);
          return assignments;
        }
      } catch (error: any) {
        console.error(
          "Error Getting Assignments:",
          error.response.data.message
        );
        return rejectWithValue(
          error.response.data.message ??
            "Error Getting Assignments, please try again!"
        );
      }
    }
  ),

  getAnAssignmentById: createAsyncThunk(
    "assignments/getAnAssignmentById",
    async ({ assignmentId }: { assignmentId: string }, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/batches/assignments/get-single/${assignmentId}`
        );

        if (data.success) {
          messageSuccess(data.message);
          return data.assignment;
        }
      } catch (error: any) {
        console.error("Error Getting Assignment:", error.response.data.message);
        return rejectWithValue(
          error.response.data.message ??
            "Error Getting Assignment, please try again!"
        );
      }
    }
  ),
};
