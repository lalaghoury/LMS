"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { batchThunks } from "@/lib/features/batches/batchThunks";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";

const BatchJoiningDialog = ({
  setJoinBatch,
  joinBatch,
}: {
  setJoinBatch: React.Dispatch<React.SetStateAction<boolean>>;
  joinBatch: boolean;
}) => {
  const [batchJoiningCode, setBatchJoiningCode] = useState("");

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.batches);
  const router = useRouter();

  const handleJoinIntoBatch = async () => {
    if (batchJoiningCode.length === 0) return setJoinBatch(!joinBatch);
    dispatch(
      batchThunks.joinIntoBatchByBatchCode({ code: batchJoiningCode, router })
    );
    setBatchJoiningCode("");
    setJoinBatch(!joinBatch);
  };

  return (
    <Dialog open={joinBatch} onOpenChange={setJoinBatch}>
      <DialogTrigger asChild>
        <Button variant="outline">Join a batch</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join a batch</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-normal text-lg ">Batch code</CardTitle>
              <DialogDescription>
                Ask your teacher for the batch code, then enter it here.
              </DialogDescription>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Enter batch code"
                type="text"
                value={batchJoiningCode}
                onChange={(e) => setBatchJoiningCode(e.target.value)}
              />
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 py-4">
          <p>To sign in with a batch code</p>
          <ul className="ml-8">
            <li className="list-disc">Use an authorised account</li>
            <li className="list-disc">
              Use a batch code with 5-7 letters or numbers, and no spaces or
              symbols
            </li>
          </ul>
          <p>
            If you have trouble joining the batch, go to the Help Centre article
          </p>
        </div>
        <DialogFooter>
          <Button onClick={() => setJoinBatch(!joinBatch)}>Cancel</Button>

          <Button disabled={loading} onClick={handleJoinIntoBatch}>
            {loading && <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />}{" "}
            {loading ? "Joining..." : "Join"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BatchJoiningDialog;
