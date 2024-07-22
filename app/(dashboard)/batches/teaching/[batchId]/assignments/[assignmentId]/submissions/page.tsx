"use client";

import SubmissionCard from "@/components/submissions/SubmissionCard";
import { submissionThunks } from "@/lib/features/submissions/submissionThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface AllAssinmentSubmissionDetailsPageProps {
  params: {
    batchId: string;
    assignmentId: string;
  };
}

const AllAssinmentSubmissionDetailsPage = ({
  params,
}: AllAssinmentSubmissionDetailsPageProps) => {
  const { batchId, assignmentId } = params;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { submissions } = useAppSelector((state) => state.submissions);

  useEffect(() => {
    dispatch(
      submissionThunks.getAllSubmissionsOfAnAssignment({
        batchId,
        assignmentId,
        router,
      })
    );
  }, [batchId, dispatch, assignmentId]);

  if (submissions.length === 0) {
    return <div>No submissions found</div>;
  }

  return (
    <div className="flex flex-col space-y-4">
      {submissions.map((submission) => (
        <SubmissionCard
          submission={submission}
          key={submission._id}
          isTeacher
          route="teaching"
          assignmentId={assignmentId}
          batchId={batchId}
        />
      ))}
    </div>
  );
};

export default AllAssinmentSubmissionDetailsPage;
