"use client";

import { Button } from "@/components/ui/button";
import { batchThunks } from "@/lib/features/batches/batchThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { studentsThunks } from "@/lib/features/students/studentsThunks";
import { Icons } from "@/components/ui/icons";

interface InvitationAcceptorProps {
  params: {
    inviteCode: string;
    batchId: string;
  };
}

const InvitationAcceptor = ({ params }: InvitationAcceptorProps) => {
  const { inviteCode, batchId } = params;
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { loading, singleBatch: batch }: any = useAppSelector(
    (state) => state.batches
  );
  const { name }: any = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(batchThunks.getABatchById(batchId));
  }, [dispatch, batchId]);

  const verifyInviteCode = () => {
    dispatch(studentsThunks.verifyInviteCode({ inviteCode, batchId, router }));
  };

  return (
    <div className="w-full h-screen flex flex-col px-4 text-center items-center justify-center bg-background">
      <h1 className="text-3xl font-bold">
        Dear <sup>"</sup>
        {name}
        <sup>"</sup> you are invited to join {batch.name}
      </h1>
      <br />
      <br />

      <Button onClick={verifyInviteCode} disabled={loading}>
        {loading && <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />}{" "}
        {loading ? "Accepting..." : "Accept Invite"}
      </Button>
    </div>
  );
};

export default InvitationAcceptor;
