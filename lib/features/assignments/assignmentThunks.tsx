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
        formData: any;
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
        const { success, assignment, isSubmitted, message } = data;
        if (success) {
          messageSuccess(message);
          return { ...assignment, isSubmitted };
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

  getSubmittedAssignmentByBatchId: createAsyncThunk(
    "assignments/getSubmittedAssignmentByBatchId",
    async (
      { batchId, assignmentId }: { batchId: string; assignmentId: string },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/batches/assignments/submitted/${batchId}/${assignmentId}`
        );
        const { success, submission, message } = data;
        if (success) {
          messageSuccess(message);
          return submission;
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

  handInAsignment: createAsyncThunk(
    "assignments/handInAsignment",
    async (
      {
        formData,
        router,
        assignmentId,
        batchId,
      }: {
        formData: any;
        router: any;
        assignmentId: string;
        batchId: string;
      },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/batches/assignments/hand-in/${batchId}/${assignmentId}`,
          formData
        );

        if (data.success) {
          messageSuccess(data.message);
          router.push(
            `/dashboard/batches/${data.assignment.batchId}/assignments/${assignmentId}/submitted`
          );
          return data.assignment;
        }
      } catch (error: any) {
        console.error(
          "Error Handing In Assignment Assignment:",
          error.response.data.message
        );
        return rejectWithValue(
          error.response.data.message ??
            "Error Handing In Assignment, please try again!"
        );
      }
    }
  ),
};
