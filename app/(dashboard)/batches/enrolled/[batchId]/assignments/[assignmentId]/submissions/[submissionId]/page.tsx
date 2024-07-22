"use client";

import { Label } from "@/components/ui/label";
import { submissionThunks } from "@/lib/features/submissions/submissionThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface AssifnmentSubmissionDetailsPageProps {
  params: {
    batchId: string;
    assignmentId: string;
    submissionId: string;
  };
}

const AssinmentSubmissionDetailsPage = ({
  params,
}: AssifnmentSubmissionDetailsPageProps) => {
  const { batchId, assignmentId, submissionId } = params;
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { singleSubmission }: any = useAppSelector(
    (state) => state.submissions
  );

  useEffect(() => {
    dispatch(
      submissionThunks.getASingleSubmissionById({
        batchId,
        assignmentId,
        submissionId,
        router,
        route: "enrolled",
      })
    );
  }, [batchId, dispatch, assignmentId, submissionId]);

  if (!singleSubmission) {
    return <div>Submission not found</div>;
  }

  return (
    <div className="flex items-start justify-between w-full gap-5 px-4">
      <div className="flex flex-col w-full h-screen px-3 max-w-[700px]">
        <div className="flex items-center justify-between py-2 border-b border-gray-300">
          <h1 className="text-2xl font-bold">
            {singleSubmission?.assignmentId?.title}
          </h1>
        </div>
        <div className="flex flex-col gap-4 py-2">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-gray-300">
              <Image
                src={singleSubmission?.assignmentId?.teacherId?.avatar}
                alt="Profile"
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <p className="font-bold">
                {singleSubmission?.assignmentId?.teacherId?.name}
              </p>
              <p className="text-sm text-gray-500">
                {singleSubmission?.assignmentId?.teacherId?.email}
              </p>
            </div>
          </div>
          <h1 className="text-2xl font-bold">Instructions: </h1>
          <p className="whitespace-pre-wrap">
            {singleSubmission?.assignmentId?.instructions}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start justify-center space-y-4 min-w-[300px]">
        <div className="flex items-center gap-2">
          {singleSubmission?.assignmentId?.attachments.length > 0 && (
            <div className="flex items-start justify-center flex-col gap-2">
              <p className="text-sm font-bold">Attachments:</p>
              {singleSubmission?.assignmentId?.attachments.map(
                (attachment: any, index: number) => (
                  <a
                    key={index}
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {attachment.fileName}
                  </a>
                )
              )}
            </div>
          )}
        </div>

        <div className="p-2 space-y-3">
          <Label className="text-sm font-bold">Submitted Files: </Label>

          {singleSubmission?.attachments?.length > 0 && (
            <div className="mt-2 text-sm space-y-2">
              {singleSubmission?.attachments?.map(
                (file: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <p>{file.fileName}</p>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssinmentSubmissionDetailsPage;
