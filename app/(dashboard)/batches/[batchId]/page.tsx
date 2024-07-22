"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import AssignmentCreationDialog from "@/components/dashboard/AssignmentCreationDialog";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { batchThunks } from "@/lib/features/batches/batchThunks";
import AddNewStudentsDialog from "@/components/dashboard/AddNewStudentsDialog";

interface BatchDetailsPageProps {
  params: {
    batchId: string;
  };
}

const BatchDetailsPage = ({ params }: BatchDetailsPageProps) => {
  const { batchId } = params;
  const [assDialogOpen, setAssDialogOpen] = useState(false);
  const [addNewStudentsDialog, setAddNewStudentsDialog] = useState(false);

  const dispatch = useAppDispatch();
  const { loading, singleBatch: batch }: any = useAppSelector(
    (state) => state.batches
  );
  const { _id }: any = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(batchThunks.getABatchById(batchId));
  }, [dispatch, batchId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full px-1 flex flex-col gap-2">
      <div className="flex flex-col gap-4 py-2">
        <Image
          src={`https://picsum.photos/1200/300/?${batch?.name}`}
          alt={batch?.name}
          width={1200}
          height={300}
        />

        <h1 className="text-3xl font-bold">{batch?.name}</h1>

        {batch?.owner?._id === _id && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size={"sm"} className="rounded-full p-2">
                <Plus />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="gap-2 space-y-2 mr-0 w-72">
              <div className="grid gap-4">
                <AssignmentCreationDialog
                  assDialogOpen={assDialogOpen}
                  setAssDialogOpen={setAssDialogOpen}
                  batchId={batchId}
                />
              </div>

              <div className="grid gap-4">
                <AddNewStudentsDialog
                  addNewStudentsDialog={addNewStudentsDialog}
                  setAddNewStudentsDialog={setAddNewStudentsDialog}
                  batchId={batchId}
                />
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default BatchDetailsPage;
