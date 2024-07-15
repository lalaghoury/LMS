"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  createBatchConstants,
  createBatchStyles,
} from "@/constants/CreateBatch";
import { batchThunks } from "@/lib/features/batches/batchThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Icons } from "../ui/icons";

export const CreateBatchDialog = ({
  setCreateBatchDialogVisibility,
  createBatchDialogVisibility,
}: {
  setCreateBatchDialogVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  createBatchDialogVisibility: boolean;
}) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.batches.loading);

  const handleCreateBatch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    let values = Object.fromEntries(
      Array.from(form.elements).map((element) => {
        if (element.name === "") {
          return [element.name, undefined];
        }
        return [element.name, (element as HTMLInputElement).value];
      })
    );
    values = Object.fromEntries(
      Object.entries(values).filter(([_, value]) => value !== undefined)
    );

    dispatch(batchThunks.createBatch(values));
    setCreateBatchDialogVisibility(!createBatchDialogVisibility);
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

        <form onSubmit={handleCreateBatch} className="grid gap-4 py-2">
          {createBatchConstants.map(
            ({ label, name, type, required = false }, index) => (
              <div key={index} className="relative">
                <input
                  type={type}
                  id={`floating-${index}`}
                  className={`${createBatchStyles.input}`}
                  placeholder=" "
                  required={required}
                  name={name}
                />
                <label
                  htmlFor={`floating-${index}`}
                  className={`${createBatchStyles.label}`}
                >
                  {label}
                </label>
              </div>
            )
          )}

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
