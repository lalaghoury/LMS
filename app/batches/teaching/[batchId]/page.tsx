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
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClipboardCopy } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

interface TeachingBatchDetailsPageProps {
  params: {
    batchId: string;
  };
}

const TeachingBatchDetailsPage = ({
  params,
}: TeachingBatchDetailsPageProps) => {
  const { batchId } = params;
  const [assDialogOpen, setAssDialogOpen] = useState(false);
  const [addNewStudentsDialog, setAddNewStudentsDialog] = useState(false);

  const dispatch = useAppDispatch();
  const { singleBatch: batch }: any = useAppSelector((state) => state.batches);

  useEffect(() => {
    dispatch(batchThunks.getABatchByIdAsTeacherOrOwner(batchId));
  }, [dispatch, batchId]);

  if (!batch) {
    return <div>Batch not found</div>;
  }

  return (
    <div className="w-full px-1 flex flex-col gap-2 items-center">
      <div className="w-full flex flex-col gap-4 py-2">
        {/* <h1>Author: {batch?.owner.name}</h1> */}
        <Image
          src={`https://picsum.photos/1200/300/?${batch?.name}`}
          alt={batch?.name}
          width={1440}
          height={300}
          className="!w-full"
        />

        <div className="w-full h-1 bg-gray-300" />

        <div className="flex items-center justify-between gap-2">
          <h1 className="text-2xl font-bold">{batch?.name}</h1>

          <Popover>
            <PopoverTrigger asChild>
              <Button size={"sm"} className="rounded-full w-40">
                <Plus className="w-7 h-7" />
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
        </div>

        <div className="flex gap-2 items-center md:max-w-96 w-full">
          <BlockStudentDialog batchTeacherCode={batch?.batchTeacherCode} />
          <Link
            href={`/batches/teaching/${batch?._id}/assignments`}
            className="w-full"
          >
            <Button className="w-full">View Assignments</Button>
          </Link>
          <Link
            href={`/batches/teaching/${batch?._id}/students`}
            className="w-full"
          >
            <Button className="w-full">View Students</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeachingBatchDetailsPage;

function BlockStudentDialog({
  batchTeacherCode,
}: {
  batchTeacherCode: string;
}) {
  const { toast } = useToast();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Teachers</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Teachers</DialogTitle>
          <DialogDescription>
            Here is the invitation code to invite teachers
          </DialogDescription>
        </DialogHeader>
        <div className="grid flex-1 gap-2">
          <Label htmlFor="link" className="sr-only">
            Code:
          </Label>

          <div className="flex gap-1 items-center px-2 pr-3">
            <Input defaultValue={batchTeacherCode} readOnly />

            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <DialogClose asChild>
                    <ClipboardCopy
                      onClick={() => {
                        navigator.clipboard.writeText(batchTeacherCode);
                        toast({
                          title: "Code Copied",
                          description: "Invite code copied successfully.",
                        });
                      }}
                      className="h-6 w-6 cursor-pointer"
                    />
                  </DialogClose>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4 bg-popover text-sm text-popover-foreground p-2"
                >
                  Copy
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <DialogFooter className="sm:justify-start justify-end">
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
