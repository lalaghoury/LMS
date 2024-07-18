"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createBatchConstants } from "@/constants/CreateBatch";
import { batchThunks } from "@/lib/features/batches/batchThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Icons } from "../ui/icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BatchCreationSchema } from "@/models/Batch";
import type { BatchCreation } from "@/models/Batch";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const createBatchStyles = {
  label:
    "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1",
  input:
    "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer",
};

export const CreateBatchDialog = ({
  setCreateBatchDialogVisibility,
  createBatchDialogVisibility,
}: {
  setCreateBatchDialogVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  createBatchDialogVisibility: boolean;
}) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.batches.loading);
  const router = useRouter();

  const handleCreateBatch = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(batchThunks.createBatch(values));
    setCreateBatchDialogVisibility(!createBatchDialogVisibility);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BatchCreation>({
    resolver: zodResolver(BatchCreationSchema),
  });

  const onSubmit: SubmitHandler<BatchCreation> = ({
    name,
    section,
    subject,
    room,
  }) => {
    dispatch(
      batchThunks.createBatch({
        values: { name, section, subject, room },
        router,
      })
    );
  };

  return (
    <Dialog
      open={createBatchDialogVisibility}
      onOpenChange={setCreateBatchDialogVisibility}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create class</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-2">
          {createBatchConstants.map(({ label, name }, index) => (
            <div key={index} className="relative">
              <Input
                type={"text"}
                id={`floating-${index}`}
                className={`${createBatchStyles.input}`}
                placeholder=" "
                {...register(name)}
              />
              <Label htmlFor={name} className={`${createBatchStyles.label}`}>
                {label}
              </Label>

              {errors[name] && (
                <p className="bg-yellow-100 text-red-500 italic px-2 py-1 rounded-md self-start">
                  {errors[name]?.message}
                </p>
              )}
            </div>
          ))}

          <DialogFooter>
            <Button onClick={() => setCreateBatchDialogVisibility(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && (
                <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
              )}{" "}
              {loading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
