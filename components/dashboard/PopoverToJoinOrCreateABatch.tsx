"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";

import { CreateBatchDialog } from "./CreateBatchDialog";
import { Button } from "../ui/button";
import BatchJoiningDialog from "./BatchJoiningDialog";

export function PopoverToJoinOrCreateABatch() {
  const [createBatch, setCreateBatch] = useState(false);
  const [joinBatch, setJoinBatch] = useState(false);
  const [checkedBatch, setCheckedBatch] = useState(false);
  const [createBatchDialogVisibility, setCreateBatchDialogVisibility] =
    useState(false);

  const handleCreateBatch = () => {
    setCreateBatch(!createBatch);
    setCreateBatchDialogVisibility(!createBatchDialogVisibility);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size={"sm"} className="rounded-full p-2">
            <Plus />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 mr-20 gap-2 space-y-2">
          <div className="grid gap-4">
            <BatchJoiningDialog
              joinBatch={joinBatch}
              setJoinBatch={setJoinBatch}
            />
          </div>

          <div className="grid gap-4">
            <Dialog open={createBatch} onOpenChange={setCreateBatch}>
              <DialogTrigger asChild>
                <Button variant="outline">Create a batch</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    Using Classroom at a school/university with students?
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <p>
                    If so, your school must sign up for a Google Workspace for
                    Education account before you can use Classroom. Learn more
                    Google Workspace for Education lets schools/universities
                    decide which Google services their students can use, and
                    provides additional privacy and security protection that is
                    important in a school or university setting. Students cannot
                    use Classroom in a school or university with their personal
                    accounts.
                  </p>
                  <div
                    className="flex p-5 gap-3 bg-secondary rounded-md "
                    onClick={() => setCheckedBatch(!checkedBatch)}
                  >
                    <input
                      type="checkbox"
                      id="checkedBatch"
                      value="checkedBatch"
                      checked={checkedBatch}
                      onChange={(e) => setCheckedBatch(e.target.checked)}
                    />
                    <Label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I've read and understand the above notice, and I'm not
                      using Classroom at a school/university with students
                    </Label>
                  </div>
                </div>

                <DialogFooter>
                  <Button onClick={() => setCreateBatch(!createBatch)}>
                    Cancel
                  </Button>
                  <Button disabled={!checkedBatch} onClick={handleCreateBatch}>
                    Continue
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </PopoverContent>
      </Popover>

      <CreateBatchDialog
        setCreateBatchDialogVisibility={setCreateBatchDialogVisibility}
        createBatchDialogVisibility={createBatchDialogVisibility}
      />
    </>
  );
}
